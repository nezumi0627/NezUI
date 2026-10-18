from PIL import Image, ImageDraw
from pathlib import Path
files = sorted(Path('artifacts/design-audit-before').glob('*.png'))
canvas=Image.new('RGB',(1400,((len(files)+4)//5)*170),'#161819')
draw=ImageDraw.Draw(canvas)
for i,file in enumerate(files):
 im=Image.open(file).convert('RGB'); im.thumbnail((270,140))
 x=(i%5)*280; y=(i//5)*170
 draw.text((x+8,y+4),file.stem,fill='white'); canvas.paste(im,(x+(280-im.width)//2,y+24))
canvas.save('artifacts/design-audit-before.png')
