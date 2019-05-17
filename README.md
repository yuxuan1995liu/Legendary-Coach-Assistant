# 6835-LCA
# 6.835 Final Project - Legendary Coach Assistant: A Multimodal Competition Helper


Abstract


This github contains a multi-modal system aiming at helping the coach in E-sports teams to make better decisions during matches. The system, named “Legendary Coach Assistant”, helps the coach to observe instant emotional and competitive state of players, which are not usually observable through traditional quantitative measurements. The presented system incorporates multiple inputs modalities and the data collected is pre-processed, analyzed and visualized on a designed interface. It is believed that through these visualizations, the coach would get a better understanding of a player’s emotional and competitive state, and thus make more appropriate decisions during a match to improve team performance.

Team
Yuxuan Liu, Shaoying Tan, Yichen Jia

Using the System


To use all the module of the system, you have to have a Windows computer, since the Tobii 4C hardware currently only supports Windows.

Toolkits and how to run 


-Eye-tracking Module:   

navigate to the interaction_streams folder  
Tobii 4C hardware required, and currently the device only supports windows.  
Run tobii_stream.sln  

-System Volume Module:  

navigate to the system_vol folder  
Python3 system_vol.py  
The default port is port 2, and might need to be changed on a different computer. Please set it to the audio device with input channels.  
-Emotion Recognition through Speech Content  
navigate to voice_rec folder  
navigate to folder “python-sdk-develop”, run “python setup.py install” to install Watson SDK  
run “pip install -r requirements.txt”. This would install the requested version of autobahn, Twisted, pyOpenSSL, service-identity, sounddevice, wave, pyaudio, python_dateutil.  
navigate back to voice_rec folder. Run main.py.  

-Emotion Recognition through Face Expression  

navigate to face_emotion_rec_realtime folder
pip install opencv-python  
pip install -r requirements.txt. This would install the requested version of multiple libraries including Tensorflow, Keras, Sklearn, matplotlib, Numpy, pillow and etc.  
Be careful for the location of the .h5 model and the “haarcascade_frontalface_default.xml” file.  
Run test_pic_taking.py  

-Speech Volume Module:

Navigate to voice_rec folder  
If not installed, do Pip install threading, wave, sounddevice, numpy and pyaudio.  
Run read_volume.py  

With all the detection module running, you could run the data visualization as instructed:  
-Data visualization: 

navigate to the web folder
Python3 -m http.server
Be careful for the path of data input files

