/** Code-native SVG layouts. Original app artwork is embedded without retouching. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
const sharp=require('/Users/backward/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const ROOT=path.resolve(import.meta.dirname,'..'), OUT=path.join(ROOT,'assets');
const TEMP='/tmp/github-more-work-motion';await fs.mkdir(TEMP,{recursive:true});
const e=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const text=(x,y,s,size=22,fill='#ecf3f7',weight=400)=>`<text x="${x}" y="${y}" fill="${fill}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}">${e(s)}</text>`;
const shell=(h,body,accent='#a8f0cf')=>`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${h}" viewBox="0 0 1200 ${h}"><defs><radialGradient id="glow"><stop stop-color="${accent}" stop-opacity=".15"/><stop offset="1" stop-color="${accent}" stop-opacity="0"/></radialGradient><linearGradient id="surface" x2="1" y2="1"><stop stop-color="#152333"/><stop offset="1" stop-color="#0b121d"/></linearGradient><filter id="shadow" x="-50%" y="-30%" width="200%" height="180%"><feDropShadow dx="0" dy="18" stdDeviation="16" flood-color="#000" flood-opacity=".5"/></filter><clipPath id="bound"><rect x="1" y="1" width="1198" height="${h-2}" rx="28"/></clipPath></defs><g clip-path="url(#bound)"><rect width="1200" height="${h}" fill="url(#surface)"/>${body}</g><rect x="1" y="1" width="1198" height="${h-2}" rx="28" fill="none" stroke="#314152"/></svg>`;
const img=async(file)=>'data:image/png;base64,'+(await sharp(path.join(OUT,'source',file)).png().toBuffer()).toString('base64');
const specs=[
{slug:'nightwatch',name:'NightWatch',category:'SECURITY SERVICES / MOBILE',accent:'#f6aaa1',tag:['Security support.','Connected people.'],lines:['Emergency requests & in-app chat','Security service app workflows','A connected mobile experience'],status:'NIGHT WATCH RESPONDERS / IOS'},
{slug:'dirham',name:'Dirham',category:'SERVICES / MARKETPLACE / AUCTIONS',accent:'#8abaff',tag:['Services meet','opportunities.'],lines:['Service requests & provider proposals','Auctions, bids & marketplace flows','Location-based discovery'],status:'VIEW ON GOOGLE PLAY'},
{slug:'clickingshop',name:'ClickingShop',category:'E-COMMERCE / MOBILE SHOPPING',accent:'#f5d26c',tag:['Discover. Choose.','Shop.'],lines:['Product discovery & detail pages','Shopping cart & saved favorites','Categories, settings & notifications'],status:'VIEW ON GOOGLE PLAY'}];
for(const [index,p] of specs.entries()){
 const ext='jpg';
 const sources=await Promise.all([0,1,2,3].map(i=>img(`${p.slug}-${i}.${ext}`)));
 const dir=path.join(TEMP,p.slug+'-showcase');await fs.mkdir(dir,{recursive:true});
 for(let n=0;n<32;n++){
  const phase=n/32*Math.PI*2;
  let b='<ellipse cx="921" cy="295" rx="360" ry="365" fill="url(#glow)"/>';
  b+=`<path d="M606 0V650" stroke="#263745"/><path d="M630 560H1170" stroke="#2c3f4a"/>`;
  b+=`<rect x="44" y="40" width="78" height="78" rx="19" fill="#080c12"/><image href="${sources[0]}" x="46" y="42" width="74" height="74" preserveAspectRatio="xMidYMid meet"/>`;
  b+=text(141,69,`0${index+1} / MORE WORK`,14,p.accent,700)+text(141,99,p.category,13,'#acbac9',700);
  b+=text(44,203,p.name,70,'#f4f7fa',700);
  p.tag.forEach((line,i)=>b+=text(44,271+i*47,line,40,p.accent,700));
  p.lines.forEach((line,i)=>b+=text(65,389+i*35,line,23,'#c3cfd8')+`<circle cx="48" cy="${381+i*35}" r="3" fill="${p.accent}"/>`);
  b+=`<rect x="44" y="527" width="496" height="1" fill="#344453"/><circle cx="50" cy="564" r="5" fill="${p.accent}"/>`;
  b+=text(67,570,p.status,16,p.accent,700)+text(44,611,'REAL APP SCREENS / MORE FROM MY PORTFOLIO',12,'#879bab',700);
  const screens=[{i:3,x:641,y:154,w:188,h:408,r:-9},{i:1,x:970,y:127,w:188,h:408,r:9},{i:2,x:797,y:82,w:234,h:508,r:0}];
  for(const [j,s] of screens.entries()){
   const y=s.y+Math.sin(phase+j*1.4)*7;
   b+=`<g transform="rotate(${s.r},${s.x+s.w/2},${y+s.h/2})" filter="url(#shadow)"><rect x="${s.x-3}" y="${y-3}" width="${s.w+6}" height="${s.h+6}" rx="13" fill="#f3f4f5"/><image href="${sources[s.i]}" x="${s.x}" y="${y}" width="${s.w}" height="${s.h}" preserveAspectRatio="xMidYMid meet"/></g>`;
  }
  const x=44+n/31*495;b+=`<path d="M44 528H540" stroke="${p.accent}" stroke-opacity=".3"/><circle cx="${x}" cy="528" r="3" fill="${p.accent}"/>`;
  const svg=shell(650,b,p.accent);
  if(n===0){await fs.writeFile(path.join(OUT,p.slug+'-showcase.svg'),svg);await sharp(Buffer.from(svg)).png().toFile(path.join(OUT,p.slug+'-showcase.png'));}
  await sharp(Buffer.from(svg)).resize(1000).png().toFile(path.join(dir,`${String(n).padStart(2,'0')}.png`));
 }
 console.log('Rendered',p.slug);
}
