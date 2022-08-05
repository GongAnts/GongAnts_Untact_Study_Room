# https://blog.naver.com/PostView.naver?blogId=chandong83&logNo=221151415638&categoryNo=29&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView
# 카메라 영상 받아서 저장

import cv2
from PIL import Image
import sys
import datetime
from cv2 import FILE_NODE_NAMED

# file name
now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
filename = str(now) + ".jpg"

# cascade_file
cascade_file = "haarcascade_frontalface_default.xml"
cascade =  cv2.CascadeClassifier(cv2.data.haarcascades + cascade_file)

CAM_ID = 0

# 1) face capture
def capture(camid = CAM_ID):
    cam = cv2.VideoCapture(camid, cv2.CAP_DSHOW)

    if cam.isOpened() == False:
        print ('cant open the cam (%d)' % camid)
        return None

    ret, frame = cam.read()
    if frame is None:
        print ('frame is not exist')
        return None
    
    # jpg save
    img_test = cv2.imwrite(filename, frame, params=[cv2.IMWRITE_PNG_COMPRESSION,0])
    cam.release()

if __name__ == '__main__':
    capture()


# https://cooluks.tistory.com/187
# https://github.com/opencv/opencv/tree/master/data/haarcascades

# 2) face detection & output save
image = cv2.imread(filename)
image_gs = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

face_list = cascade.detectMultiScale(image_gs, scaleFactor=1.1,
                                     minNeighbors=1, minSize=(150, 150))

# face detection
if len(face_list) > 0:
    print(face_list)
    color = (0, 0, 255)
    for face in face_list:
        x, y, w, h = face
        cv2.rectangle(image, (x, y), (x+w, y+h), color, thickness=8)
    cv2.imwrite( FILE_NODE_NAMED + "_output"+ ".jpg", image)
    
else:
    print("no face")