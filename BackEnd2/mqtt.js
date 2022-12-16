const mqtt = require("mqtt");
const { sequelize, Part, Test_result, Machine } = require("./models");

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
let firstFlag = false; // 1호기
let secondFlag = false; // 2호기
let thirdFlag = false; // 3호기
let goodsetFlag1 = false; // 색깔 판별해서 흰색이면 true
let goodsetFlag2 = false; // 2호기에 도달했을 때 true
let final_result = null;
let arr = [];
// let emegen = false;

//
// async function finalProcess(machineElementsSorts) {

// }

// const client = mqtt.connect("mqtt://localhost:1883"); // connect PLC directly
const client = mqtt.connect("mqtt://192.168.0.72:1883"); // connect PLC through JK smart connector

client.on("connect", () => {
  console.log("connected" + client.connected);
});

client.subscribe("machine");

// subscribe에 대한 message 받기. 각 topic에 따른 로직 처리
client.on("message", async (topic, message, packet) => {
  // console.log("###########");
  try {
    // message가 buffer로 오므로 JSON 형식으로 변환
    const rareElements = await JSON.parse(message.toString());
    const machineElements = rareElements.Wrapper;
    // tagId 순서로 오름차순 정렬
    const machineElementsSorts = await machineElements.sort((a, b) => {
      if (parseInt(a.tagId) > parseInt(b.tagId)) {
        return 1;
      } else if (parseInt(a.tagId) < parseInt(b.tagId)) {
        return -1;
      } else {
        return 0;
      }
    });
    // 비상상황일 때, machine_status를 2로 update하고, 긴급정지횟수 컬럼에 1 update, 모든 변수를 초기 setting
    // if (machineElementsSorts[23].value == false && emegen == false) {
    //   emegen = true;
    //   await Machine.update(
    //     { machine_status: 2 },
    //     {
    //       where: {
    //         id: 1,
    //       },
    //     }
    //   );
    //   await Machine.increment({ emergencyCount: 1 }, { where: { id: 1 } });

    //   firstFlag = false; // 1호기
    //   secondFlag = false; // 2호기
    //   thirdFlag = false; // 3호기
    //   goodsetFlag1 = false; // 색깔 판별해서 흰색이면 true
    //   goodsetFlag2 = false; // 2호기에 도달했을 때 true
    //   final_result = null;
    // } else {
    if (
      // tag 26(belt)가 true이거나 tag 1(Start)이 true이면, machine_status : 1 (동작 중)
      machineElementsSorts[16].value == true ||
      machineElementsSorts[1].value == true
    ) {
      // emegen = false;
      await Machine.update(
        { machine_status: 1 },
        {
          where: {
            id: 1,
          },
        }
      );

      // tag 3(No1_Action)이 true이면, firstFlag = true, thirdFlag = true, secondFlag와 goodsetFlag1, goodsetFlag2는 false로 초기화
      if (machineElementsSorts[2].value == true) {
        firstFlag = true;
        thirdFlag = true;
        secondFlag = false;
        goodsetFlag1 = false;
        goodsetFlag2 = false;
      }

      // tag 4(No2_Action)가 false이면, secondFlag = true
      if (machineElementsSorts[3].value == false) {
        secondFlag = true;
      }

      // tag 6(ColorSensor)이 true이면, goodsetFlag1(색깔 판별해서 흰색이면 true) = true
      if (machineElementsSorts[4].value == true) {
        goodsetFlag1 = true;
      }

      // tag 18(No2Chip)이 true이면, goodsetFlag2(2호기에 도달했을 때 true) = true
      if (machineElementsSorts[11].value == true) {
        goodsetFlag2 = true;
      }

      setTimeout(() => {
        arr.push(machineElementsSorts[14].value);
      }, 1300);

      let count1 = arr.reduce(
        (count, data) => (data === 1 ? count + 1 : count),
        0
      );
      let count2 = arr.reduce(
        (count, data) => (data === 2 ? count + 1 : count),
        0
      );
      let count3 = arr.reduce(
        (count, data) => (data === 3 ? count + 1 : count),
        0
      );
      let count4 = arr.reduce(
        (count, data) => (data === 4 ? count + 1 : count),
        0
      );
      let count5 = arr.reduce(
        (count, data) => (data === 5 ? count + 1 : count),
        0
      );
      let count6 = arr.reduce(
        (count, data) => (data === 6 ? count + 1 : count),
        0
      );
      console.log(arr);
      console.log("count1 : ", count1);
      console.log("count2 : ", count2);
      console.log("count3 : ", count3);
      console.log("count4 : ", count4);
      console.log("count5 : ", count5);
      console.log("count6 : ", count6);
      console.log(
        "Max : ",
        Math.max(count1, count2, count3, count4, count5, count6)
      );
      let dice_num2;
      dice_num2 = Math.max(count1, count2, count3, count4, count5, count6);

      // tag 25(No3Gripper)이 true이고, thirdFlag가 true이면,
      if (machineElementsSorts[15].value == true && thirdFlag == true) {
        // await finalProcess(machineElementsSorts);
        // 1) 변수 재설정
        let secondFlag_t = secondFlag;
        let goodsetFlag1_t = goodsetFlag1;
        let goodsetFlag2_t = goodsetFlag2;
        firstFlag = false;
        secondFlag = false;
        thirdFlag = false;
        goodsetFlag1 = false;
        goodsetFlag2 = false;

        // 2) 1,2,3호기 DB count +=1
        await Part.increment({ count: 1 }, { where: { PartDefaultId: 1 } });
        if (secondFlag_t == true) {
          await Part.increment({ count: 1 }, { where: { PartDefaultId: 2 } });
        }
        await Part.increment({ count: 1 }, { where: { PartDefaultId: 3 } });

        // 주사위 눈
        let dice_num;
        if (dice_num > 0) {
          dice_num = dice_num2;
          dice_num2 = null;
        }

        // 	3) goodsetFlag1_t와 goodsetFlag2_t 같으면 양품(1), 다르면 고품(2)
        if (goodsetFlag1_t == goodsetFlag2_t) {
          final_result = 1;
        } else if (goodsetFlag1_t != goodsetFlag2_t) {
          final_result = 2;
        } else {
          console.log("양품, 고품 판별 불가");
        }

        // 4) serial_number 만들기	. serial_number는 ('LOCK'+ date)
        const rawDate = machineElementsSorts[0].value;
        const serial_number =
          "LOCK" +
          rawDate.substr(0, 4) +
          rawDate.substr(5, 2) +
          rawDate.substr(8, 2) +
          rawDate.substr(11, 2) +
          rawDate.substr(14, 2) +
          rawDate.substr(17, 2);
        console.log(serial_number);

        // 6) DB에 serial_number와 함께 양품인지 고품인지 여부를 각각 저장
        const test_result = await Test_result.findOne({
          where: { serial_number },
        });
        console.log(test_result);
        //
        if (!test_result) {
          if (final_result == 2) {
            await Test_result.create({
              serial_number,
              final_result,
              dice_num: 0,
              MachineId: 1,
            });
          } else {
            await Test_result.create({
              serial_number,
              final_result,
              dice_num,
              MachineId: 1,
            });
          }
          arr = [];
          dice_num = 0;
        }
      }
    } else if (
      // start == false && belt == false -> machine_status : 0 (동작 멈춤)
      machineElementsSorts[16].value == false &&
      machineElementsSorts[1].value == false
    ) {
      await Machine.update(
        { machine_status: 0 },
        {
          where: {
            id: 1,
          },
        }
      );
    }
    // }
  } catch (error) {
    // console.log("plc data 누수");
    console.log(error);
  }

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
//   if (topic === "machine") {
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
//   } else if (topic === "machine2") {
//     console.log("아직 개발 안 한 로직");

//     // topic이 machine, machine2 모두 아니라면
//   } else {
//     client.on("error", (error) => {
//       console.log("Can't connect" + error);
//       client.end();
//     });
//   }
// });
