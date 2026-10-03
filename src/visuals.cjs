const story = require('./story.cjs');
const TAU=Math.PI*2, clamp=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const ease=x=>{x=clamp(x);return x*x*(3-2*x)};
const mix=(a,b,t)=>a+(b-a)*t;
const noise=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x)};
function draw(ctx,t,W=1920,H=1080){
 const ch=Math.min(9,Math.floor(t/30)),u=t-ch*30,shot=Math.min(4,Math.floor(u/6)),v=u%6;
 const [tag,zh,en,col]=story[ch],beat=Math.exp(-(t%.5)*10);
 ctx.save();ctx.scale(W/1920,H/1080);ctx.fillStyle='#040712';ctx.fillRect(0,0,1920,1080);
 const neb=ctx.createRadialGradient(1080+Math.sin(t*.09)*220,500,0,1080,500,1000);
 neb.addColorStop(0,col+'20');neb.addColorStop(.5,'#16234438');neb.addColorStop(1,'#03061000');ctx.fillStyle=neb;ctx.fillRect(0,0,1920,1080);
 const txt=(s,x,y,size=22,color='#edf5ff',align='left',weight=400)=>{ctx.font=`${size}px "${weight>=500?'Film Bold':'Film Regular'}", sans-serif`;ctx.fillStyle=color;ctx.textAlign=align;ctx.fillText(s,x,y)};
 const line=(a,b,color=col,width=1,alpha=1)=>{ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();ctx.globalAlpha=1};
 const dot=(x,y,r,color=col,glow=true)=>{if(color.length===4)color='#'+[...color.slice(1)].map(c=>c+c).join('');if(glow){let g=ctx.createRadialGradient(x,y,0,x,y,r*4);g.addColorStop(0,color+'70');g.addColorStop(1,color+'00');ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r*4,0,TAU);ctx.fill()}ctx.fillStyle=color;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.fill()};
 const ring=(x,y,r,color=col,alpha=.25)=>{ctx.globalAlpha=alpha;ctx.strokeStyle=color;ctx.lineWidth=1;ctx.beginPath();ctx.arc(x,y,r,0,TAU);ctx.stroke();ctx.globalAlpha=1};
 // Deterministic star field: parallax, not random frame noise.
 for(let i=0;i<210;i++){const d=.25+noise(i+80);let x=(noise(i)*1920+t*d*7)%1920,y=(noise(i+22)*1080+t*d*2)%1080;ctx.globalAlpha=.15+noise(i+19)*.45;ctx.fillStyle=i%5===0?col:'#b6c7ea';ctx.fillRect(x,y,d*2,d*2)}ctx.globalAlpha=1;
 // Perspective floor and cinematic framing.
 for(let i=-12;i<=12;i++)line({x:960+i*44,y:680},{x:960+i*210,y:990},col,.7,.06);
 for(let i=0;i<8;i++){const y=680+((i*44+t*14)%310);line({x:0,y},{x:1920,y},col,.7,.07)}
 const camera=Math.sin(u*.11)*.32+Math.sin(u*.3)*.035;
 function project(x,y,z=0){const a=camera*(ch===1?.3:1);const xx=x*Math.cos(a)+z*Math.sin(a),zz=-x*Math.sin(a)+z*Math.cos(a);const zoom=1+Math.sin(u*.15)*.035;const s=1000/(1250+zz)*zoom*(ch===6?.87:ch===7?.88:1);return{x:960+xx*s,y:(ch===6||ch===7?540:570)+y*s,s}}
 function node(p,r=16,label='',active=false){ring(p.x,p.y,r*p.s+6,col,active?.8:.25);dot(p.x,p.y,r*p.s,active?'#ffffff':col);if(label)txt(label,p.x,p.y+6,17,'#08101f','center',700)}
 function edge(a,b,progress=0){line(a,b,col,1.2,.34);if(progress>0){const q=progress%1;dot(mix(a.x,b.x,q),mix(a.y,b.y,q),3,'#ffffff')}}
 const phase=ease(v/1.6),pulse=(t*2)%1;
 if(ch===0||ch===9){
   const resolve=ch===0?ease((u-4)/16):1-ease((u-24)/6)*.45;
   const pts=[];
   for(let i=0;i<180;i++){const a=i*2.39996+t*.055;const yy=1-2*(i+.5)/180;const rr=Math.sqrt(1-yy*yy);const chaos=1-resolve;const x=Math.cos(a)*rr*380+Math.sin(i*71+t*.2)*300*chaos;const y=yy*300+Math.cos(i*41+t*.1)*200*chaos;const z=Math.sin(a)*rr*380;pts.push(project(x,y,z));}
   for(let i=0;i<pts.length;i++){if(i+13<pts.length)line(pts[i],pts[i+13],col,.7,.15*resolve);if(i+1<pts.length)line(pts[i],pts[i+1],col,.5,.12*resolve);dot(pts[i].x,pts[i].y,1.5+pts[i].s*1.5,col)}
   for(let i=0;i<3;i++){ctx.save();ctx.translate(960,570);ctx.rotate(-.4+i*.5+t*.025);ctx.scale(1,.4+i*.15);ring(0,0,360+i*65,col,.2);ctx.restore()}
   if(ch===0&&u<6||ch===9&&u>23){ctx.fillStyle='#04071280';ctx.fillRect(320,398,1280,240);txt(zh,960,500,86,'#f4f6ff','center',600);txt(en,960,562,30,col,'center',400);txt('A FIVE-MINUTE JOURNEY INTO DATA STRUCTURES',960,608,15,'#a8b8d6','center')}
 } else if(ch===1){
   const focus=Math.floor(u*2)%10;const pts=[];
   for(let i=0;i<10;i++){let p=project((i-4.5)*135,Math.sin(u*.4)*20,0);pts.push(p);const s=p.s,hi=i===focus;ctx.fillStyle=hi?col+'65':col+'18';ctx.strokeStyle=hi?'#ffffff':col+'80';ctx.lineWidth=hi?2:1;ctx.fillRect(p.x-47*s,p.y-55*s,94*s,110*s);ctx.strokeRect(p.x-47*s,p.y-55*s,94*s,110*s);txt(String(i*7+3).padStart(2,'0'),p.x,p.y+10,32*s,'#ffffff','center',500);txt(`[${i}]`,p.x,p.y+90*s,18,col,'center');if(hi){dot(p.x,p.y-78*s,5,'#fff');line({x:960,y:340},{x:p.x,y:p.y-80*s},col,1.4,.7)}}
   txt('ADDRESS = BASE + INDEX × STRIDE',960,775,23,col,'center');txt('CONTIGUOUS MEMORY   /   RANDOM ACCESS',960,822,16,'#94a5c4','center');
 } else if(ch===2){
   const pts=[];for(let i=0;i<9;i++){const a=i*.65+u*.08;pts.push(project((i-4)*148,Math.sin(a)*100,Math.cos(a)*150))}
   for(let i=0;i<8;i++){edge(pts[i],pts[i+1],t*.5-i*.08);let p=pts[i+1];txt('›',p.x-45,p.y+9,32,col)}
   pts.forEach((p,i)=>{node(p,27,String(i+1),Math.floor(u)%9===i);txt(i===8?'NULL':'NEXT →',p.x,p.y+64,14,col,'center')});
   txt('NODE → NODE → NODE',960,790,26,col,'center');
 } else if(ch===3){
   const cyc=u%12,count=cyc<6?Math.floor(cyc)+1:12-Math.floor(cyc);for(let i=0;i<6;i++){const y=755-i*65,x=960+i*7;const active=i<count;ctx.fillStyle=active?col+(i===count-1?'66':'25'):'#ffffff04';ctx.strokeStyle=active?col+'bb':col+'22';ctx.beginPath();ctx.moveTo(x-210,y);ctx.lineTo(x+160,y);ctx.lineTo(x+215,y-27);ctx.lineTo(x-155,y-27);ctx.closePath();ctx.fill();ctx.stroke();if(active)txt(`FRAME 0${i}`,x-122,y-7,15,i===count-1?'#fff':col)}
   const y=755-(count-1)*65;line({x:1280,y:y-12},{x:1200,y:y-12},col,2);txt('TOP',1300,y-4,22,col);txt(cyc<6?'PUSH ↓':'POP ↑',580,555,42,col,'center',500);txt('LAST IN / FIRST OUT',960,822,22,col,'center');
 } else if(ch===4){
   const offset=(u%2)/2;for(let i=-1;i<8;i++){const x=460+(i-offset)*157;const a=clamp((x-220)/180)*clamp((1670-x)/180);ctx.globalAlpha=a;ctx.fillStyle=col+'22';ctx.strokeStyle=col;ctx.lineWidth=1;ctx.fillRect(x,493,106,106);ctx.strokeRect(x,493,106,106);txt(String(Math.floor(u/2)+i+2).padStart(2,'0'),x+53,559,30,col,'center');ctx.globalAlpha=1}line({x:360,y:640},{x:1580,y:640},col,1,.6);txt('DEQUEUE ←',380,710,23,col);txt('← ENQUEUE',1370,710,23,col);txt('HEAD',380,453,17,'#fff');txt('TAIL',1470,453,17,'#fff');txt('FIRST IN / FIRST OUT',960,800,24,col,'center');
 } else if(ch===5){
   const keys=['ALPHA','BETA','GAMMA','DELTA','EPSILON'],buckets=[1,4,2,4,0];const active=Math.floor(u/2)%5;
   for(let i=0;i<5;i++){const y=382+i*85;txt(keys[i],420,y+8,22,i===active?'#fff':col,'center');edge({x:520,y},{x:885,y:552},i===active?pulse:0);edge({x:1040,y:552},{x:1360,y:382+buckets[i]*85},i===active?pulse:0)}
   ring(960,552,80,col,.8);ring(960,552,90+beat*5,col,.3);txt('h(key)',960,562,27,'#fff','center');
   for(let i=0;i<5;i++){ctx.fillStyle=col+'18';ctx.strokeStyle=col+'80';ctx.fillRect(1360,350+i*85,185,62);ctx.strokeRect(1360,350+i*85,185,62);txt(`BUCKET ${i}`,1452,390+i*85,19,col,'center')}
   txt('BETA ≠ DELTA  /  SAME BUCKET → COLLISION',960,837,20,col,'center');
 } else if(ch===6){
   const pts=[];for(let i=0;i<31;i++){const d=Math.floor(Math.log2(i+1)),j=i-(2**d-1);pts.push(project((j-(2**d-1)/2)*(1150/2**d),-250+d*133,Math.sin(i+u*.1)*25))}
   const path=[0,2,5,12,26],depth=Math.floor(u*2)%5;
   for(let i=1;i<31;i++){const p=Math.floor((i-1)/2);edge(pts[p],pts[i],path.includes(i)?pulse:0)}pts.forEach((p,i)=>node(p,14,'',path[depth]===i));txt('COMPARE → CHOOSE → NARROW',960,850,24,col,'center');
 } else if(ch===7){
   const pts=[];for(let i=0;i<64;i++){const a=i*2.39996,yy=1-2*(i+.5)/64,r=Math.sqrt(1-yy*yy);pts.push(project(Math.cos(a)*r*640,yy*340,Math.sin(a)*r*370))}
   for(let i=0;i<64;i++){for(let k=1;k<=2;k++){let j=(i+k*7)%64;edge(pts[i],pts[j],i%8===Math.floor(u)%8?pulse:0)}}pts.sort((a,b)=>a.s-b.s).forEach((p,i)=>node(p,5+i%4,'',i%11===Math.floor(u)%11));txt('VERTICES + EDGES = RELATIONSHIPS',960,846,22,col,'center');
 } else if(ch===8){
   const ox=500,oy=776,ww=920,hh=380;line({x:ox,y:oy},{x:ox+ww+80,y:oy},'#8191ab',1,.6);line({x:ox,y:oy},{x:ox,y:oy-hh-40},'#8191ab',1,.6);
   const curves=[['O(1)','#67ddff',x=>.07],['O(log n)','#b9ff81',x=>Math.log2(1+x*31)/9],['O(n)','#ffcb77',x=>x*.82],['O(n²)','#ff8abb',x=>x*x*.95]];
   for(const [label,c,fn] of curves){ctx.beginPath();ctx.strokeStyle=c;ctx.lineWidth=3;for(let k=0;k<=100;k++){let x=k/100;const p={x:ox+x*ww,y:oy-fn(x)*hh};k?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y)}ctx.stroke();txt(label,ox+ww+22,oy-fn(1)*hh+7,22,c);const q=(u%6)/6;dot(ox+q*ww,oy-fn(q)*hh,5,c)}txt('INPUT SIZE  n →',ox+ww-110,oy+45,17,'#a7b6cf','center');txt('ASYMPTOTIC GROWTH / SCHEMATIC',960,850,18,col,'center');
 }
 // Editorial overlays stay screen-space, independent of the 3D camera.
 const shade=ctx.createLinearGradient(0,0,0,330);shade.addColorStop(0,'#040712');shade.addColorStop(1,'#04071200');ctx.fillStyle=shade;ctx.fillRect(0,0,1920,330);
 txt('S / O',86,86,25,'#ffffff','left',600);txt('THE SHAPE OF ORDER',174,84,15,'#a4b5d0');txt(`${String(ch+1).padStart(2,'0')} / 10`,1834,84,17,col,'right');
 line({x:86,y:112},{x:1834,y:112},'#adc6ff',1,.18);
 txt(tag,90,164,18,col);if(!(ch===0&&u<6||ch===9&&u>23)){txt(zh,86,233,52,'#f4f7ff','left',500);txt(en,90,275,21,'#aebfd8')}
 // Small timecode and rhythmic beat markers.
 txt(`${String(Math.floor(t/60)).padStart(2,'0')}:${String(Math.floor(t%60)).padStart(2,'0')}`,1834,164,18,'#a4b5d0','right');
 for(let i=0;i<12;i++){ctx.fillStyle=i===Math.floor((t*2)%12)?col:'#ffffff20';ctx.fillRect(1674+i*14,194,6,6)}
 // Bilingual open captions, high contrast and inside broadcast-safe margins.
 const sub=story[ch][4][shot];const alpha=Math.min(ease(v/.35),ease((6-v)/.35));
 ctx.fillStyle='#030610e8';ctx.fillRect(0,898,1920,140);ctx.globalAlpha=alpha;
 txt(sub[0],960,952,32,'#f4f7ff','center',500);txt(sub[1],960,998,23,'#aabbd5','center');ctx.globalAlpha=1;
 ctx.fillStyle='#ffffff12';ctx.fillRect(86,1044,1748,2);ctx.fillStyle=col;ctx.fillRect(86,1044,1748*t/300,2);
 // Chapter match-cut: an expanding spectral iris and a short blackout on the downbeat.
 if(u<.85&&ch>0){const k=1-ease(u/.85);ctx.fillStyle='#030610';ctx.globalAlpha=k;ctx.fillRect(0,0,1920,1080);ctx.globalAlpha=1;ring(960,570,80+ease(u/.85)*1100,col,k*.8)}
 const fade=Math.min(ease(t/2),ease((300-t)/3));if(fade<1){ctx.fillStyle='#030610';ctx.globalAlpha=1-fade;ctx.fillRect(0,0,1920,1080);ctx.globalAlpha=1}
 ctx.restore();
}
module.exports={draw};
