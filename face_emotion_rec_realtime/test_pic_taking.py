
import cv2
import time
from keras.preprocessing import image
from keras.models import Model, load_model

import numpy as np
from visualization_gui import plot_emotion_prediction


model = load_model('model_2_BN.h5')

#plot_emotion_prediction(custom[0])
emotion_dict = {0: 'angry', 1: 'disgust', 2:'fear', 3: 'happy', 4:'sad', 5:'surprise', 6: 'neutral'}

cap = cv2.VideoCapture(0)
cap.set(3, 640) #WIDTH
cap.set(4, 480) #HEIGHT
time_ini = time.time()
interval = 2
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
#eye_cascade = cv2.CascadeClassifier('venv/lib/python3.6/site-packages/cv2/data/haarcascade_eye.xml')

while(True):
    # Capture frame-by-frame
    ret, frame = cap.read()

    # Our operations on the frame come here
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
    #print(len(faces)) -> detected or not
    # Display the resulting frame
    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]
        k = time.time()
        if k-time_ini >= interval:
            #print("[INFO] Object found. Saving locally.")
            cv2.imwrite('data/faces.jpg', roi_color)
            time_ini = time.time()
            img = image.load_img("data/faces.jpg", grayscale=True, target_size=(48, 48))
            x = image.img_to_array(img)
            x = np.expand_dims(x, axis = 0)
            x /= 255
            custom = model.predict(x)
            (value, emotion) = (max([(v,i) for i,v in enumerate(custom[0])]))
            if emotion == 1:
                emotion = 6
            elif emotion == 2:
                emotion = 4
            elif emotion ==5:
                emotion = 3
            with open('../web/data/facial_output.txt',"w") as f:
                f.write(str(emotion_dict[emotion]))
            print(emotion_dict[emotion])
         # eyes = eye_cascade.detectMultiScale(roi_gray)
         # for (ex,ey,ew,eh) in eyes:
         #     cv2.rectangle(roi_color,(ex,ey),(ex+ew,ey+eh),(0,255,0),2)

    cv2.imshow('frame',frame)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break
# When everything done, release the capture
cap.release()
cv2.destroyAllWindows()