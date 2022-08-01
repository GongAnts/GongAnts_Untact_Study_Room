# https://blog.naver.com/PostView.naver?blogId=chandong83&logNo=221151415638&categoryNo=29&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView
# 카메라 영상 받아서 저장

import cv2
from PIL import Image
import sys
import datetime

# file name
now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
filename = now + ".jpg"


CAM_ID = 0

def capture(camid = CAM_ID):

    cam = cv2.VideoCapture(camid, cv2.CAP_DSHOW)

    if cam.isOpened() == False:
        print ('cant open the cam (%d)' % camid)
        return None

    ret, frame = cam.read()
    if frame is None:
        print ('frame is not exist')
        return None
    
    # 영상 저장 
    # file name
    now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    filename = str(now) + ".jpg"
    cv2.imwrite(filename , params=[cv2.IMWRITE_PNG_COMPRESSION,0])
    cam.release()

    #return filename

if __name__ == '__main__':
    capture()


# https://cooluks.tistory.com/187
# https://github.com/opencv/opencv/tree/master/data/haarcascades
# 얼굴 영역 검출 및 영역 표시하기

 
cascade_file = "haarcascade_frontalface_default.xml"
cascade =  cv2.CascadeClassifier(cv2.data.haarcascades + cascade_file)
 
#image_file = "gani.jpg"  # ./data/face2.jpg
image_file = "filename"
image = cv2.imread(image_file)
image_gs = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
 
face_list = cascade.detectMultiScale(image_gs, scaleFactor=1.1,
                                     minNeighbors=1, minSize=(150, 150))
if len(face_list) > 0:
    print(face_list)
    color = (0, 0, 255)
    for face in face_list:
        x, y, w, h = face
        cv2.rectangle(image, (x, y), (x+w, y+h), color, thickness=8)
    cv2.imwrite("facedetect-output.PNG", image)
else:
    print("no face")

# cv_im = cv2.imread('gani.jpg', 0)
# print("img.shape = {0}".format(cv_im.shape))

# cv2.imshow('cv_im', cv_im)
# cv2.waitKey(0)
# cv2.destroyAllWindows()