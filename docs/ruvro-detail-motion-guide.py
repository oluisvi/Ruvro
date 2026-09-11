from PIL import Image
import numpy as np
import math, subprocess
image = Image.open('/home/user/detail.png').convert('RGB')
width, height = 960, 720
encoder = subprocess.Popen(['ffmpeg','-y','-loglevel','error','-f','rawvideo','-pixel_format','rgb24','-video_size','960x720','-framerate','24','-i','pipe:0','-an','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-movflags','+faststart','/home/user/guide.mp4'], stdin=subprocess.PIPE)
yy, xx = np.mgrid[0:height,0:width]
for frame in range(96):
    t = max(0., min(1., (frame-12)/71))
    ease = t*t*(3-2*t)
    zoom = 1 + .025*ease
    cw, ch = width/zoom, height/zoom
    left, top = (width-cw)*.65, (height-ch)*.45
    im = image.transform((width,height),Image.Transform.EXTENT,(left,top,left+cw,top+ch),Image.Resampling.BICUBIC)
    pixels = np.asarray(im,dtype=np.float32)
    luminance = pixels.mean(axis=2)/255
    band = np.exp(-((xx/width-(.12+.76*ease))/.17)**2)
    mask = band * np.sin(np.pi*t) * np.clip((luminance-.12)*1.2,0,.8)
    pixels = np.clip(pixels*(1+.075*mask[:,:,None]),0,255).astype('uint8')
    encoder.stdin.write(pixels.tobytes())
encoder.stdin.close()
if encoder.wait() != 0: raise RuntimeError('encode failed')
