# Broker
mqtt 통신을 위한 broker를 docker를 이용해서 실행한다. 
</br>
</br>

## Broker의 역할
> publisher와 subscriber의 중간 역할으로 publisher가 발행한 토픽에 변화가 생겼을때 subscriber에게 변화를 알려주는 역할을 한다.
</br>
> 즉, publisher와 subscriber 사이의 메세지를 주고 받을 수 있게 하는 중개인 역할을 한다.
</br>
</br>

## broker 실행 순서
1. download docker desktop </br>
  도커를 실행하기 위해서 docker desktop을 다운받고 기본 설정을 한다.</br>
  사이트 : https://www.docker.com/products/docker-desktop/ </br>


2. download docker file </br>
  Github에 있는 docker 폴더를 다운 받는다.</br>

3. docker run </br>
  broker가 도커에서 실행되게 하기 위해서 docker Container에 등록한다.</br>
  docker 파일이 설치되어 있는 곳에서 cmd를 열고 아래 명령어를 작성한다. </br>
  ```
   docker-compose up -d
  ```

4. docker desktop </br>
  docker desktop에서 Containers에 있는 mosquitto 이미지를 실행한다.

</br>
</br>

## mosquitto.conf
MQTT broker port : 9001:9001 </br>
MQTT WebSocket port : 1883:1883 </br>
(+) 왼쪽 포트가 실제 할당된 포트넘버, 오른쪽 포트가 사용하는 포트 넘버
