# Python
Vision Sensor를 위한 Python Code
<br/>

## 개발환경
1. library 설치
```
pip install opencv-python
pip install numpy
```

2. 기본 환경 설정
```
HOST = '192.168.0.xxx'  # 교육키트 IP
PORT = 200x           # 교육키트 Port
BUFSIZE = 1024
```

3. 카메라 설정
```
cap = cv2.VideoCapture(0) # 0 or 1
```
우선 카메라가 연결되어 있는지 확인한다. <br />
0과 1 중에서 되는 것을 사용한다.
