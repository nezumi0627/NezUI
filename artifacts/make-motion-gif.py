from PIL import Image
from pathlib import Path
files = sorted(Path('artifacts/motion-frames').glob('*.png'))
frames = [Image.open(file).convert('RGB') for file in files]
frames[0].save('artifacts/nezui-motion-demo.gif', save_all=True, append_images=frames[1:], duration=[100 if i % 6 != 5 else 500 for i in range(len(frames))], loop=0, optimize=True)
print('Saved artifacts/nezui-motion-demo.gif')
