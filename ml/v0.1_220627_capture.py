# # https://blog.naver.com/PostView.naver?blogId=chandong83&logNo=221151415638&categoryNo=29&parentCategoryNo=0&viewDate=&currentPage=1&postListTopCurrentPage=1&from=postView
# # 카메라 영상 받아서 저장

# import cv2
# from PIL import Image
# import sys
# import datetime


# # file name
# now = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
# filename = now + ".jpg"


# CAM_ID = 0
# def capture(camid = CAM_ID):

#     cam = cv2.VideoCapture(camid, cv2.CAP_DSHOW)

#     if cam.isOpened() == False:
#         print ('cant open the cam (%d)' % camid)
#         return None

#     ret, frame = cam.read()
#     if frame is None:
#         print ('frame is not exist')
#         return None
    
#     # png로 압축 없이 영상 저장 
#     cv2.imwrite(filename, frame, params=[cv2.IMWRITE_PNG_COMPRESSION,0])
#     cam.release()

# # if __name__ == '__main__':
# capture()


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
    img_test = cv2.imwrite(filename , frame, params=[cv2.IMWRITE_PNG_COMPRESSION,0])
    cam.release()


    return img_test

# if __name__ == '__main__':
filename = capture()