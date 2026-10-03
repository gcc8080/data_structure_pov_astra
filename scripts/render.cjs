const {createCanvas,GlobalFonts}=require('@napi-rs/canvas');
const fs=require('node:fs');const path=require('node:path');const {spawn}=require('node:child_process');const {once}=require('node:events');
const root=path.resolve(__dirname,'..');process.chdir(root);GlobalFonts.registerFromPath('assets/NotoSansSC-Regular.ttf','Film Regular');GlobalFonts.registerFromPath('assets/NotoSansSC-Bold.ttf','Film Bold');
const {draw}=require('../src/visuals.cjs');const story=require('../src/story.cjs');
const W=Number(process.env.WIDTH||1920),H=W*9/16,FPS=Number(process.env.FPS||24),D=300;
fs.mkdirSync('output',{recursive:true});
const stamp=s=>`${String(Math.floor(s/3600)).padStart(2,'0')}:${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(s%60).padStart(2,'0')},000`;
fs.writeFileSync('output/subtitles.srt',story.flatMap((c,i)=>c[4].map((s,j)=>`${i*5+j+1}\n${stamp(i*30+j*6)} --> ${stamp(i*30+j*6+6)}\n${s.join('\n')}\n`)).join('\n'));
const canvas=createCanvas(W,H),ctx=canvas.getContext('2d');
(async()=>{
 if(process.argv.includes('--stills')){for(let i=0;i<10;i++){draw(ctx,i*30+15,W,H);fs.writeFileSync(`output/still-${i}.jpg`,canvas.toBuffer('image/jpeg',90))}return}
 const ff=spawn('ffmpeg',['-y','-f','rawvideo','-pix_fmt','rgba','-s',`${W}x${H}`,'-r',String(FPS),'-i','pipe:0','-i','output/score.wav','-map','0:v','-map','1:a','-c:v','libx264','-preset','fast','-crf','21','-pix_fmt','yuv420p','-c:a','aac','-b:a','256k','-t',String(D),'-movflags','+faststart','output/shape-of-order.mp4'],{stdio:['pipe','ignore','inherit']});
 ff.stdin.on('error',e=>{if(e.code!=='EPIPE')console.error(e)});
 for(let f=0;f<D*FPS;f++){draw(ctx,f/FPS,W,H);if(!ff.stdin.write(Buffer.from(ctx.getImageData(0,0,W,H).data.buffer)))await once(ff.stdin,'drain');if(f%(FPS*10)===0)console.log(`Rendered ${f/FPS}s / ${D}s`)}
 ff.stdin.end();const [code]=await once(ff,'close');if(code!==0)throw Error(`ffmpeg exited ${code}`);
})().catch(e=>{console.error(e);process.exitCode=1});
