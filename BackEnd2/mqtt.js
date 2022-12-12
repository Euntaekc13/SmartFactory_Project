const { sequelize } = require("./models");
const mqtt = require("mqtt");
// 임시 DB -> 바꿔줘야 함
const Element = require("./models/element");

// DB와 연결
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

// 전역변수
let flag1 = false;
let flag2 = false;

// const client = mqtt.connect("mqtt://localhost:1883"); // connect PLC directly
const client = mqtt.connect("mqtt://192.168.0.72:1883"); // connect PLC through JK smart connector

client.on("connect", () => {
  console.log("connected" + client.connected);
});

// topic에 대한 분기처리를 하고 싶은데 설정하는 방법이 있나유 ?
// ex ) if machine => subscribe (machine)
//      else if machine2 => subscribe(machine2)
// 문제점 : 어떤 값이 들어왔을때 판단을 하고 싶은데 들어오기 전에 미리 설정을 해둬야함
// clinet.subscribe()를 여러가지 작성하면 연결이 제대로 이뤄지지 않음 (예상)
// 여러가지 구독 가능한가요 ?
// 네 가능합니다 ↓↓↓

// 두 topic에 대한 subscribe
// client.subscribe(["machine", "machine2"]);
client.subscribe("machine1");

// subscribe에 대한 message 받기. 각 topic에 따른 로직 처리
client.on("message", (topic, message, packet) => {
  // console.log("###########");

  // message가 buffer로 오므로 JSON으로 변환
  const rareElements = JSON.parse(message.toString());
  // tag의 number로 해당 tag의 정보를 부를 수 있게 tag의 number를 키값으로 값는 객체로 재정리
  const machineElements = rareElements.Wrapper;
  // console.log(machineElements);

  // console.log("orign : ", machineElements);

  const machineElementsSorts = machineElements.sort((a, b) => {
    if (parseInt(a.tagId) > parseInt(b.tagId)) {
      return 1;
    } else if (parseInt(a.tagId) < parseInt(b.tagId)) {
      return -1;
    } else {
      return 0;
    }
  });

  if (machineElementsSorts[6].value === true) {
    flag1 = true;
  }

  if (machineElementsSorts[18].value === true) {
    flag2 = true;
    if (flag1 === flag2) {
      console.log("###########################");
      flag1 = false;
      flag2 = false;

      // machineElementsSorts.map((i) =>
      Element.create({
        tagId: machineElementsSorts[3].tagId,
        name: machineElementsSorts[3].name,
        value: machineElementsSorts[3].value,
        status: true,
      });
      // );
      console.log("6번 true");
    } else {
      console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@");
      flag1 = false;
      flag2 = false;
      Element.create({
        tagId: machineElementsSorts[3].tagId,
        name: machineElementsSorts[3].name,
        value: machineElementsSorts[3].value,
        status: false,
      });
      console.log("6번 false");
    }
  }

  // 20 true -> 6번 true / false
  // if (machineElementsSorts[20].value === true) {
  //   if (machineElementsSorts[6].value === true) {
  //     console.log("6번 true");
  //   } else if (machineElementsSorts[6].value === false) {
  //     console.log("6번 false");
  //   } else {
  //     console.log("아님");
  //   }
  // }

  // // 받은 데이터 모두 DB에 저장
  // machineElementsSorts.map((i) =>
  //   Element.create({
  //     tagId: i.tagId,
  //     name: i.name,
  //     value: i.value,
  //   })
  // );

  // for (i = 0; i < machineElements.length; i++) {
  //   if (elements[i + 1]) {
  //     // 어떤 데이터들은 전송되지 않았을 수도 있어서 없는 key값도 있기 때문에 필터해줘야 한다.
  //     Element.create({
  //       tagId: i + 1,
  //       name: elements[i + 1]["name"],
  //       value: elements[i + 1].value,
  //     });
  //     console.log(`${elements[i + 1]["name"]}에 대한 정보가 DB에 추가`);
  //   }
  // }

  // console.log("tagId 오름차순 : ", machineElementsSorts);

  // machineElementsSorts.map((i) =>
  //   // tagId 값에 따라 DB에 저장
  //   // 로직할 것이 있으면 먼저 하고 DB에 저장해야 함
  //   // 아래는 예시
  //   switch (parseInt(i.tagId)){
  //     case 6:
  //       로직~~~~~~~~~~~~~
  //       테이블명.create({
  //         컬럼명: i.tagId,
  //         컬럼명: i.name,
  //         컬럼명: i.value,
  //       })
  //       break;
  //     case 1,3,7:
  //       테이블명.create({
  //         컬럼명: i.tagId,
  //         컬럼명: i.name,
  //         컬럼명: i.value,
  //       })
  //       break;
  //     case 1,3,7:
  //       테이블명.create({
  //         컬럼명: i.tagId,
  //         컬럼명: i.name,
  //         컬럼명: i.value,
  //       })
  //       break;
  //     case 1,3,7:
  //       테이블명.create({
  //         컬럼명: i.tagId,
  //         컬럼명: i.name,
  //         컬럼명: i.value,
  //       })
  //       break;
  //     case 1,3,7:
  //       테이블명.create({
  //         컬럼명: i.tagId,
  //         컬럼명: i.name,
  //         컬럼명: i.value,
  //       })
  //       break;
  //     case 1,3,7:
  //       테이블명.create({
  //         컬럼명: i.tagId,
  //         컬럼명: i.name,
  //         컬럼명: i.value,
  //       })
  //   }
  //   console.log(i)
  // );

  // var today = new Date();

  // console.log(today);

  // Element.create({
  //   tagId: 3,
  //   name: elements[3]["name"],
  //   value: elements[3].value,
  // });

  // console.log("the end");
});

// error 처리
client.on("error", (error) => {
  console.log("Can't connect" + error);
  client.end();
});

//////////////////////////////

// 두 topic에 대한 subscribe
// client.subscribe(["machine", "machine2"]);

// // subscribe에 대한 message 받기. 각 topic에 따른 로직 처리
// client.on("message", (topic, message, packet) => {
//   // topic이 machine이라면
//   if (topic === machine) {
//     console.log("###########");

//     // message가 buffer로 오므로 JSON으로 변환
//     const rareElements = JSON.parse(message.toString());

//     // tag의 number로 해당 tag의 정보를 부를 수 있게 tag의 number를 키값으로 값는 객체로 재정리
//     const machineElements = rareElements.Wrapper;
//     // console.log(machineElements[0].tagId)
//     const elements = {};
//     for (i = 0; i < machineElements.length; i++) {
//       const tagNumber = machineElements[i].tagId;
//       elements[tagNumber] = machineElements[i];
//     }

//     // 받은 데이터 모두 DB에 저장
//     // for (i = 0; i < machineElements.length; i++) {
//     //   if (elements[i + 1]) {
//     //     // 어떤 데이터들은 전송되지 않았을 수도 있어서 없는 key값도 있기 때문에 필터해줘야 한다.
//     //     Element.create({
//     //       tagId: i + 1,
//     //       name: elements[i + 1]["name"],
//     //       value: elements[i + 1].value,
//     //     });
//     //     console.log(`${elements[i + 1]["name"]}에 대한 정보가 DB에 추가`);
//     //   }
//     // }

//     console.log("the end");

//     // topic이 machine2라면
//   } else if (topic === machine2) {
//     console.log("아직 개발 안 한 로직");

//     // topic이 machine, machine2 모두 아니라면
//   } else {
//     client.on("error", (error) => {
//       console.log("Can't connect" + error);
//       client.end();
//     });
//   }
// });

// // error 처리
// client.on("error", (error) => {
//   console.log("Can't connect" + error);
//   client.end();
// });
