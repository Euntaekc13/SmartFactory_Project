# IoT
PLC를 이용한 Mini Smart Factory Edukit </br>

- Edukit
![edukit](https://user-images.githubusercontent.com/80251711/209537987-e1fb78eb-a18a-4444-ba8a-bcb0688dad91.jpg)
- 기기 정보 : exp40-TTA

</br>
</br>

## 사용한 것들
- PLC Control Program : XG5000
- PLC Connector : C#

</br>
</br>

## XG5000
XG5000으로 PLC 정보에 대한 수정이 가능하다.

</br>
</br>

## C#
PLC와 다른 프레임을 연결 해주기 위한 Connector 역할을 한다. </br>
다른 프레임들과 MQTT 통신을 하고 Publisher 역할을 수행한다. 그러기 위해서 Broker와 연결해야 한다.

</br>
</br>

## 실행 순서 

1. PLC와 PC 연결 </br>
   PLC와 PC의 통신을 위해서 서로를 LAN선으로 연결한다. </br></br>
   
2. .net core 3.1 설치 </br>
   코드를 실행하기 위해선 C#에서 .net core 3.1을 필수적으로 설치해야 한다. </br>
   사이트 : https://dotnet.microsoft.com/en-us/download/dotnet/3.1 </br></br>
   
3. EdgeConfigFile 설정
   ```C#
    "EdukitId": "topic",  // 사용할 topic 설정
    "EdukitIP": "192.168.0.120",  // PLC IP
    "EdukitPort": "2004",         // PLC port
    "MqttBrokerIP": "localhost",  // MQTT Broker IP
    "MqttBrokerPort": "1883",     // MQTT Borker port
    "WebSocketServerUrl": "",     // WebSocket Url
    "DelayTime": "1000",   // 반복 시간
    "DebugType": "Debug"
   ```
</br>

4. 코드 실행 </br>
   SmartConnector 실행 (F5)

</br>
</br>

## 유의사항
<span style="background-color:#ffdce0"><strong>코드는 EdgeConfigFile.json과 Program.cs만 수정한다.</strong></span>
