"""Build original profile artwork with Pillow. No network or API keys."""
from pathlib import Path
from html import escape
import math
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'assets'
OUT.mkdir(exist_ok=True)
BG='#0c1420'; WHITE='#edf5f2'; MUTED='#a8b9c4'; MINT='#a8f0cf'
def text(x,y,value,size=20,color=WHITE,weight=400):
 return f'<text x="{x}" y="{y}" font-family="Arial,Helvetica,sans-serif" font-size="{size}" font-weight="{weight}" fill="{color}">{escape(value)}</text>'
def svg(name,w,h,body):
 (OUT/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" role="img"><rect width="{w}" height="{h}" rx="24" fill="{BG}"/>{body}</svg>')
projects=[
('groc','01','GROC AI','Food labels. Clearer choices.','#a8f0cf','FLUTTER / AI / LARAVEL',['Scan nutrition labels and ingredients.','Insights shaped by dietary preferences.'],'APP STORE + GOOGLE PLAY','G'),
('klod','02','KLOD','See your next look on you.','#c5b5f5','FLUTTER / AI / VIRTUAL TRY-ON',['A digital wardrobe, outfit previews','and a collection of your favorite looks.'],'APP STORE + GOOGLE PLAY','K'),
('readlens','03','ReadLens','Read. Highlight. Understand.','#f4d49d','REACT NATIVE / EXPO / AI',['Camera-to-text analysis with definitions,','contextual explanations and examples.'],'AVAILABLE ON THE APP STORE','R'),
('densy','04','DENSY','Your hair journey, in perspective.','#a8c9f5','FLUTTER / PROGRESS TRACKING',['Guided photos, daily routines and','progress charts in one calm experience.'],'PREPARING FOR LAUNCH','D')]
for slug,num,title,tagline,accent,stack,lines,status,letter in projects:
 b='<rect x="1" y="1" width="578" height="365" rx="23" fill="none" stroke="#283544"/>'
 b+=text(30,37,f'SELECTED WORK / {num}',13,MUTED,700)
 b+=f'<rect x="472" y="26" width="76" height="76" rx="21" fill="{accent}"/>'
 b+=text(494,80,letter,44,BG,700)+text(30,103,title,46,WHITE,700)+text(30,142,tagline,23,accent)
 b+='<path d="M30 168H548" stroke="#283544"/>'+text(30,200,stack,13,MUTED,700)
 for i,line in enumerate(lines): b+=text(30,236+i*27,line,20,WHITE)
 b+=f'<circle cx="36" cy="318" r="4" fill="{accent}"/>'+text(49,323,status,12,accent,700)+text(521,325,'↗',27,accent)
 svg(f'{slug}.svg',580,367,b)
svg('workflow.svg',1200,174,text(34,42,'A PRACTICAL PATH FROM IDEA TO RELEASE',15,MINT,700)+''.join(text(34+i*299,96,title,29,WHITE,700)+text(34+i*299,132,desc,17,MUTED) for i,(title,desc) in enumerate([('01 / Understand','Requirements & existing code'),('02 / Build','UI, features & integrations'),('03 / Verify','Debug & test affected flows'),('04 / Deliver','Store builds & handover')])))
svg('contact.svg',1200,193,text(40,43,'HAVE AN IDEA OR AN UNFINISHED APP?',15,MINT,700)+text(40,104,'Let’s build the next version.',46,WHITE,700)+text(40,151,'Flutter development · AI app completion · Backend integration · Release support',21,MUTED)+'<circle cx="1118" cy="97" r="38" fill="#a8f0cf"/>'+text(1099,112,'↗',44,BG))
FONT=Path('/System/Library/Fonts/Supplemental')
def font(size,bold=False): return ImageFont.truetype(str(FONT/('Arial Bold.ttf' if bold else 'Arial.ttf')),size)
frames=[]
for n in range(48):
 im=Image.new('RGB',(1200,482),BG); d=ImageDraw.Draw(im)
 for x in range(835,1200,34): d.line((x,0,x,482),fill='#142231')
 for y in range(0,482,34): d.line((835,y,1200,y),fill='#142231')
 d.rounded_rectangle((1,1,1198,480),radius=24,outline='#283544',width=2)
 d.rounded_rectangle((40,34,100,76),radius=12,fill=MINT)
 d.text((52,40),'SH',font=font(25,True),fill=BG)
 d.text((119,46),'SHAZZAD HOSSAIN',font=font(18,True),fill=WHITE)
 d.text((40,119),'I turn ideas into',font=font(62,True),fill=WHITE)
 d.text((40,191),'apps people use.',font=font(66,True),fill=MINT)
 d.text((42,289),'Flutter developer. Product builder.',font=font(27),fill=WHITE)
 d.text((42,331),'From polished interfaces to connected backends.',font=font(23),fill=MUTED)
 d.text((42,401),'MOBILE  /  WEB  /  AI INTEGRATION',font=font(16,True),fill=MINT)
 d.text((42,434),'AI-assisted workflow. Developer-led decisions.',font=font(18),fill=MUTED)
 cx,cy=1010,238
 d.ellipse((855,83,1165,393),outline='#314738',width=2)
 d.ellipse((880,108,1140,368),outline='#253947',width=1)
 angle=n/48*math.tau; px,py=cx+155*math.cos(angle),cy+155*math.sin(angle)
 d.ellipse((px-6,py-6,px+6,py+6),fill=MINT)
 d.rounded_rectangle((936,107,1084,370),radius=28,fill='#162433',outline='#789488',width=2)
 d.rounded_rectangle((948,119,1072,358),radius=20,fill='#101c29')
 d.rounded_rectangle((984,125,1036,132),radius=4,fill='#55706c')
 d.rounded_rectangle((963,158,1056,203),radius=9,fill=MINT)
 d.text((977,169),'BUILD',font=font(19,True),fill=BG)
 for y,length in [(226,69),(245,91),(264,55)]: d.rounded_rectangle((964,y,964+length,y+6),radius=3,fill='#435c65')
 d.rounded_rectangle((963,296,1056,335),radius=9,fill='#203b37')
 d.text((981,306),'SHIP',font=font(15,True),fill=MINT)
 frames.append(im)
frames[0].save(OUT/'hero.gif',save_all=True,append_images=frames[1:],duration=100,loop=0,optimize=True)
frames[0].save(OUT/'hero-static.png')
print('Built hero GIF, static fallback, four project cards, workflow and contact artwork.')
