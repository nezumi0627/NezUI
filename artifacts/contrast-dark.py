def luminance(h):
 c=[int(h[i:i+2],16)/255 for i in (1,3,5)]; c=[x/12.92 if x<=0.04045 else ((x+0.055)/1.055)**2.4 for x in c];return .2126*c[0]+.7152*c[1]+.0722*c[2]
def contrast(a,b):
 x,y=sorted((luminance(a),luminance(b)),reverse=True);return round((x+.05)/(y+.05),2)
for c in ['#1a1a18','#23241f','#2d2f29','#3b3d35','#493b2e']:
 print(c, 'primary',contrast('#f7f4ec',c),'secondary',contrast('#d0d0c7',c))
