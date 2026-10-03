"""Original deterministic electronic score. 120 BPM / 600 beats / 300 seconds.
No samples or third-party compositions. Stereo synthesis, delay, pad, drums,
arpeggios and downbeat accents share the visual master clock.
"""
import numpy as np
import wave
from pathlib import Path
SR=48000
DURATION=300
rng=np.random.default_rng(8080)
mix=np.zeros((SR*DURATION,2),dtype=np.float32)
def add(s,start,gain=1,pan=0):
    i=round(start*SR)
    if i>=len(mix): return
    n=min(len(s),len(mix)-i)
    mix[i:i+n,0]+=s[:n]*gain*np.sqrt((1-pan)/2)
    mix[i:i+n,1]+=s[:n]*gain*np.sqrt((1+pan)/2)
def note(midi,dur,kind='bell'):
    t=np.arange(round(dur*SR))/SR; f=440*2**((midi-69)/12)
    if kind=='pad':
        s=sum(np.sin(2*np.pi*f*r*t+p)*a for r,p,a in [(1,0,.5),(1.003,.3,.22),(.998,1,.22),(2,0,.09)])
        env=np.minimum(t/1.4,1)*np.minimum((dur-t)/2,1)
    elif kind=='bass':
        s=np.sin(2*np.pi*f*t)+.2*np.sin(4*np.pi*f*t);env=(1-np.exp(-t*80))*np.exp(-t*3)
    else:
        s=np.sin(2*np.pi*f*t)+.28*np.sin(2*np.pi*f*2*t)+.08*np.sin(2*np.pi*f*3*t);env=(1-np.exp(-t*180))*np.exp(-t*3.6)
    return (s*env).astype(np.float32)
# D minor / Bb major / F major / C major; each harmony lasts six seconds.
chords=[[50,57,62,65,69],[46,53,58,62,65],[53,60,65,69,72],[48,55,60,64,67]]
for phrase in range(50):
    start=phrase*6; ch=phrase//5; chord=chords[phrase%4]
    for j,m in enumerate(chord):add(note(m,8,'pad'),start,.075,(j-2)*.3)
    # 16th-note motif opens gradually, rests between phrases for breathing room.
    density=2 if ch in [0,9] else 1
    for step in range(48):
        if step%density or step>=44:continue
        midi=chord[[0,2,3,1,4,2,3,4][step%8]]+12
        s=note(midi,.9);pos=start+step*.125;pan=np.sin(step*.8)*.65
        add(s,pos,.065 if ch in [0,9] else .085,pan)
        add(s,pos+.375,.022,-pan);add(s,pos+.75,.01,pan)
    for b in range(12):
        if ch==0 and phrase<2:continue
        pos=start+b*.5
        add(note(chord[0]-12,.7,'bass'),pos,.2,0)
        tt=np.arange(int(.45*SR))/SR
        kick=np.sin(2*np.pi*(46*tt+65*.022*(1-np.exp(-tt/.022))))*np.exp(-tt*13)
        add(kick,pos,.40 if ch not in [0,9] else .22)
        if b%2==1:
            tt=np.arange(int(.18*SR))/SR;n=rng.normal(0,1,len(tt));n=np.diff(n,prepend=0)
            sn=(n*.16+np.sin(2*np.pi*180*tt)*.15)*np.exp(-tt*24)
            add(sn,pos,.25,.1)
        if ch not in [0,9]:
            for sub in [0,.25]:
                tt=np.arange(int(.065*SR))/SR;n=rng.normal(0,1,len(tt));hat=np.diff(n,prepend=0)*np.exp(-tt*80)
                add(hat,pos+sub,.026,-.4 if sub else .4)
    # Twelve-beat phrase accent, stereo air and a soft reverse transition.
    tt=np.arange(SR*2)/SR;air=rng.normal(0,1,len(tt));air=np.convolve(air,np.ones(13)/13,mode='same')
    add(air*np.exp(-tt*3),start,.14,0)
    if phrase%5==4:
        tt=np.arange(SR*2)/SR;sw=rng.normal(0,1,len(tt));sw=np.convolve(sw,np.ones(21)/21,mode='same')
        add(sw*(tt/2)**2,start+4,.15,-.2)
print('Mixing stereo score...')
# Gentle saturation and fade; avoid hard clipping and retain headroom.
mix=np.tanh(mix*1.35)
peak=float(np.max(np.abs(mix)));mix*=.89/max(peak,1e-9)
fade=SR*4;mix[:fade]*=np.linspace(0,1,fade)[:,None];mix[-fade:]*=np.linspace(1,0,fade)[:,None]
Path('output').mkdir(exist_ok=True)
with wave.open('output/score.wav','wb') as f:
    f.setnchannels(2);f.setsampwidth(2);f.setframerate(SR);f.writeframes((mix*32767).astype('<i2').tobytes())
print(f'Written 300-second original score; peak={np.max(np.abs(mix)):.3f}')
