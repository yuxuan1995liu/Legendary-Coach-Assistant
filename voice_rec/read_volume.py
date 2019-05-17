import threading
import wave
import sounddevice as sd
import numpy as np
from pyaudio import PyAudio,paInt16
import time

duration = 5000 # seconds
final_output_path = '../web/data/volumn_output.txt'
def print_sound(indata, outdata, frames, time, status):
    volume_norm = np.linalg.norm(indata)*10
    with open(final_output_path,"w") as f:
        f.write(str(volume_norm/2))
    print ("|" * int(volume_norm))
    print (volume_norm/2)

with sd.Stream(callback=print_sound):
    sd.sleep(duration * 5000)