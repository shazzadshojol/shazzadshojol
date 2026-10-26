"""Package rendered SVG-layout frames as GitHub-compatible looping GIFs."""
from pathlib import Path
from PIL import Image
root=Path(__file__).resolve().parents[1]
for folder in sorted(Path('/tmp/github-portfolio-motion').iterdir()):
 files=sorted(folder.glob('*.png'))
 if len(files)!=32:raise RuntimeError(f'Expected 32 frames: {folder}')
 frames=[Image.open(p).convert('RGB') for p in files]
 # Shared palette keeps the original screen content stable as the layouts move.
 palette=frames[0].quantize(colors=256,method=Image.Quantize.MEDIANCUT)
 frames=[im.quantize(palette=palette,dither=Image.Dither.NONE) for im in frames]
 dest=root/'assets'/(folder.name+'-showcase.gif' if folder.name in ['groc','klod','readlens','densy'] else folder.name+'.gif')
 frames[0].save(dest,save_all=True,append_images=frames[1:],duration=125,loop=0,optimize=True,disposal=1)
 print(dest.name,round(dest.stat().st_size/1024),'KB')
