# https://minimin2.tistory.com/140
# 얼굴의 좌표들과 예측된 얼굴 각각의 confidence

import cv2
import cvlib as cv
from PIL import Image
import sys
import datetime

now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
filename = str(now) + ".jpg"
CAM_ID = 0
#img = cv2.imread('20220805_152452.jpg')
#gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# 1) face capture 
def face_detection(camid = CAM_ID):
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
    # cam.release()

    # 2) face detection & output save
    image = cv2.imread(filename)
    image_gs = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    # 얼굴 찾기
    faces, confidences = cv.detect_face(image)

    for (x, y, x2, y2), conf in zip(faces, confidences):
		# 3) 확률 출력하기
        cv2.putText(image, str(conf), (x,y-10), cv2.FONT_HERSHEY_PLAIN, 1, (0, 255, 0), 1)
		# 얼굴위치 bbox 그리기
        cv2.rectangle(image, (x, y), (x2, y2), (0, 255, 0), 2)

    cv2.imwrite( str(now) + "_output"+ ".jpg", image)


if __name__ == '__main__':
    face_detection()