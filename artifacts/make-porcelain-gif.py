from pathlib import Path
from PIL import Image
frames=[]
for file in sorted(Path('artifacts/porcelain-frames').glob('*.png')):
 im=Image.open(file).convert('RGB'); im.thumbnail((960,600)); frames.append(im)
frames[0].save('artifacts/nezui-porcelain-interactions.gif',save_all=True,append_images=frames[1:],duration=130,loop=0)
print('Saved interaction GIF')
