# 목표

- count : 각 part(1호기, 2호기, 3호기) 사용횟수
- serial_number : LOCK 팀 이름 + 공정 시간
- final_result : 1(양품) or 2(고품)
- dice_num : 1~6(양품일 때 주사위 눈) or 0(고품)
  <br>
  <br>
# 전략

- 연산 횟수 최소화
- 판단을 위한 전역 변수 선언
- 가벼운 로직 구현
  <br>
  <br>
# 시작 명령어

- npm i
- node mqtt
  <br>
  <br>

# mqtt 자동 발생기

mqtt로 특정 데이터를 자동으로 발생 시키는 기능
<br>
<br>

# docker-compose로 실행

- docker-compose up -d 로 실행
- docker-compose exec simulator-server npm i
- docker-compose exec simulator-server npm run docker



