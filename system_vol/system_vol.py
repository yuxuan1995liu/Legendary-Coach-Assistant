# Print out realtime audio volume as ascii bars

import sounddevice as sd
import numpy as np


duration = 3600  # seconds
sd.default.device[0] = 2

output_path = '../web/data/game_output.txt'
def print_sound(indata, outdata, frames, time, status):
    volume_norm = np.linalg.norm(indata)*10
    with open(output_path,"w") as f:
    	f.write(str(volume_norm*2+20))
    print(int(volume_norm))

with sd.Stream(callback=print_sound):
    sd.sleep(duration * 1000)