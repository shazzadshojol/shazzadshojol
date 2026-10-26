/** New code-native skill and service layouts. Does not touch hero or app showcases. */
import fs from 'node:fs/promises';
import path from 'node:path';
import {createRequire} from 'node:module';
const require=createRequire(import.meta.url);
let sharp;try{sharp=require('sharp')}catch{sharp=require('/Users/backward/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp')}
const root=path.resolve(import.meta.dirname,'..'), assets=path.join(root,'assets');
const temp='/tmp/github-profile-skills-services';await fs.mkdir(temp,{recursive:true});
const colors={fg:'#edf5f8',muted:'#adbfcc',mint:'#a8f0cf',line:'#334956'};
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const text=(x,y,s,size=26,color=colors.fg,weight=400)=>`<text x="${x}" y="${y}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
const iconData={};
for(const file of await fs.readdir(path.join(assets,'technology'))){if(file.endsWith('.svg'))iconData[file.slice(0,-4)]='data:image/svg+xml;base64,'+(await fs.readFile(path.join(assets,'technology',file))).toString('base64')}
function icon(name,x,y,size=66){return `<rect x="${x}" y="${y}" width="${size}" height="${size}" rx="16" fill="#f4f7fa"/><image href="${iconData[name]}" x="${x+10}" y="${y+10}" width="${size-20}" height="${size-20}" preserveAspectRatio="xMidYMid meet"/>`}
function shell(h,body){return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="${h}" viewBox="0 0 1200 ${h}"><defs><linearGradient id="surface" x2="1" y2="1"><stop stop-color="#162738"/><stop offset="1" stop-color="#0c1521"/></linearGradient></defs><rect x="1" y="1" width="1198" height="${h-2}" rx="26" fill="url(#surface)" stroke="#354856"/>${body}</svg>`}
async function render(name,height,draw){
 const dir=path.join(temp,name);await fs.mkdir(dir,{recursive:true});
 for(let n=0;n<32;n++){
  const svg=shell(height,draw(n));
  if(n===0){await fs.writeFile(path.join(assets,name+'.svg'),svg);await sharp(Buffer.from(svg)).png().toFile(path.join(assets,name+'.png'))}
  await sharp(Buffer.from(svg)).png().toFile(path.join(dir,String(n).padStart(2,'0')+'.png'));
 }
 console.log('Rendered',name);
}
const groups=[
 {name:'skills-core',title:'THE CORE / MY PRIMARY FOCUS',sub:'Cross-platform apps and connected product features.',cols:3,items:[['flutter','Flutter','Mobile development'],['dart','Dart','Application logic'],['firebase','Firebase','Connected app services']]},
 {name:'skills-product',title:'ACROSS THE PRODUCT / ALSO WORK WITH',sub:'Mobile interfaces, web experiences and backend systems.',cols:3,items:[['react','React Native','Mobile interfaces'],['expo','Expo','React Native workflow'],['laravel','Laravel','APIs & backend features'],['php','PHP','Server-side development'],['html','HTML','Web structure'],['css','CSS','Responsive styling']]},
 {name:'skills-foundations',title:'FOUNDATIONS / CONTINUING TO GROW',sub:'Basic knowledge that supports my wider development work.',cols:2,items:[['javascript','JavaScript','Foundational knowledge'],['nodejs','Node.js','Foundational knowledge']]},
 {name:'skills-workflow',title:'THE WORKFLOW / EVERYDAY TOOLS',sub:'Version control, debugging, app builds and release preparation.',cols:4,items:[['git','Git','Version control'],['github','GitHub','Code collaboration'],['androidstudio','Android Studio','Android development'],['xcode','Xcode','iOS builds & releases']]}
];
for(const g of groups){
 const rows=Math.ceil(g.items.length/g.cols),h=124+rows*176+22;
 await render(g.name,h,n=>{
  let b=text(34,39,g.title,16,colors.mint,700)+text(34,82,g.sub,25,colors.muted);
  const width=(1132-(g.cols-1)*18)/g.cols;
  g.items.forEach(([id,label,desc],i)=>{
   const x=34+(i%g.cols)*(width+18),y=112+Math.floor(i/g.cols)*176;
   const active=Math.floor(n/32*g.items.length)===i;
   b+=`<rect x="${x}" y="${y}" width="${width}" height="157" rx="20" fill="${active?'#203b3c':'#132231'}" stroke="${active?'#a8f0cf':'#334958'}" stroke-width="${active?2:1}"/>`;
   b+=icon(id,x+20,y+18,64)+text(x+20,y+115,label,g.cols===4?27:32,colors.fg,700)+text(x+20,y+142,desc,g.cols===4?17:20,colors.muted);
   if(active){const v=(n/32*g.items.length)%1;const px=x+16+v*(width-32);b+=`<circle cx="${px}" cy="${y+1}" r="3" fill="#d0ffe7"/>`}
  });return b;
 });
}
const services=[
 ['Mobile app development','From an idea or design to Android and iOS.','UI, navigation, features and backend connections.',['flutter','dart']],
 ['Complete unfinished apps','Review existing or AI-generated code.','Fix broken flows and finish missing features.',['github','flutter']],
 ['Connected product features','Authentication, notifications and subscriptions.','REST APIs, Firebase and AI service integrations.',['firebase','laravel']],
 ['Backends & admin dashboards','Laravel and PHP APIs for connected products.','Web interfaces to manage app content and flows.',['laravel','php']],
 ['Debugging & release support','Investigate bugs and test the affected flows.','Prepare Android builds and iOS store releases.',['androidstudio','xcode']]
];
await render('services-cards',1010,n=>{
 let b=text(34,42,'WHAT I CAN HELP YOU BUILD / FROM FIRST IDEA TO NEXT RELEASE',17,colors.mint,700);
 services.forEach(([title,l1,l2,icons],i)=>{
  const y=77+i*180,active=Math.floor(n/32*5)===i;
  b+=`<rect x="30" y="${y}" width="1140" height="160" rx="22" fill="${active?'#1d3539':'#132231'}" stroke="${active?'#a8f0cf':'#334958'}" stroke-width="${active?2:1}"/>`;
  b+=text(52,y+44,'0'+(i+1),22,active?colors.mint:'#7893a5',700)+text(117,y+45,title,36,colors.fg,700)+text(117,y+91,l1,25,colors.muted)+text(117,y+126,l2,25,colors.muted);
  icons.forEach((id,j)=>b+=icon(id,968+j*87,y+43,66));
  if(active){const px=46+((n/32*5)%1)*1100;b+=`<circle cx="${px}" cy="${y+1}" r="3" fill="#d0ffe7"/>`}
 });return b;
});
