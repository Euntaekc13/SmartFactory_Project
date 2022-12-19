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
let dice_num = 0;
let dice_num2 = null;
let arr = [0, 0, 0, 0, 0, 0];
let result = null;

// const client = mqtt.connect("mqtt://localhost:1883"); // connect PLC directly
const client = mqtt.connect("mqtt://192.168.0.72:1883"); // connect PLC through JK smart connector

client.on("connect", () => {
  console.log("connected" + client.connected);
});

// client.subscribe("machine");
client.subscribe(["machine", "machine1"]);

// subscribe에 대한 message 받기. 각 topic에 따른 로직 처리
client.on("message", async (topic, message, packet) => {
  // topic이 machine인 공정
  if (topic == "machine") {
    // console.log("machin2222222222222222e");
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
      // console.log(machineElementsSorts);

      if (
        // tag 26(belt)가 true이거나 tag 1(Start)이 true이면, machine_status : 1 (동작 중)
        machineElementsSorts[16].value == true ||
        machineElementsSorts[1].value == true
      ) {
        // console.log("****************");
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
        // setTimeout(() => {
        //   if (machineElementsSorts[14].value > 0) {
        //     arr.push(machineElementsSorts[14].value);
        //   }
        // }, 1200);

        // 주사위 눈 값 배열에 담고, 가장 빈도수 높은 값 dice_num2에 담기

        if (machineElementsSorts[14].value > 0) {
          // arr.push(machineElementsSorts[14].value);
          switch (machineElementsSorts[14].value) {
            case "1":
              arr[0] = arr[0] + 1;
              break;
            case "2":
              arr[1] = arr[1] + 1;
              break;
            case "3":
              arr[2] = arr[2] + 1;
              break;
            case "4":
              arr[3] = arr[3] + 1;
              break;
            case "5":
              arr[4] = arr[4] + 1;
              break;
            case "6":
              arr[5] = arr[5] + 1;
              break;
            default:
              break;
          }
        }

        // tag 25(No3Gripper)이 true이고, thirdFlag가 true이면,
        if (machineElementsSorts[15].value == true && thirdFlag == true) {
          console.log("first arr : ", arr, dice_num);
          // 1) 변수 재설정
          let secondFlag_t = secondFlag;
          // let goodsetFlag1_t = goodsetFlag1;
          // let goodsetFlag2_t = goodsetFlag2;
          firstFlag = false;
          secondFlag = false;
          thirdFlag = false;
          // goodsetFlag1 = false;
          // goodsetFlag2 = false;

          let count = 0;

          let arr2 = arr.filter((element, index, array) => {
            if (element > 0) {
              count++;
              return element;
            }
          });

          // count가 0보다 큰 값이 하나이면, 그 값이 정답
          if (count == 1) {
            dice_num = arr.indexOf(Math.max(...arr)) + 1;
            console.log("count가 1인 경우 : ", dice_num);
          }

          // count가 0보다 큰 값이 2개 이상이면
          if (count >= 2) {
            arr2.sort(function (a, b) {
              return b - a;
            });
            let firstindex = arr2.indexOf(Math.max(...arr2));
            arr2[firstindex] = 0;

            // 두번째로 큰 값이 7보다 크면, 두번째로 큰 값의 주사위 눈이 dice_num 이다.
            if (Math.max(...arr2) > 7) {
              let firstindex = arr.indexOf(Math.max(...arr));
              arr[firstindex] = 0;
              dice_num = arr.indexOf(Math.max(...arr)) + 1;
              console.log(
                "count가 2개 이상이고 두번째로 큰 값이 7보다 큰 경우 : ",
                dice_num
              );
              // 두번째로 큰 값이 7보다 작거나 같은 경우
            } else {
              // 두번쨰로 큰 값이 6이나 7인데, 그 값이 Max보다 큰 index에 있는 경우, 두 번째로 큰 값을 가지는 주사위 눈이 dice_num 이다
              if (
                (Math.max(...arr2) == 7 || Math.max(...arr2) == 6) &&
                arr.indexOf(Math.max(...arr2)) > arr.indexOf(Math.max(...arr))
              ) {
                dice_num = arr.indexOf(Math.max(...arr2)) + 1;
                console.log(
                  "count가 2개 이상이고 두번째로 큰 값이 6이나 7인데, 그 값이 Max보다 큰 index에 있는 경우, 두 번째로 큰 값을 가지는 주사위 눈이 dice_num ",
                  dice_num
                );
              } else {
                // 그 이외의 경우, 가장 큰 값을 가지는 주사위 눈이 dice_num 이다
                dice_num = arr.indexOf(Math.max(...arr)) + 1;
                console.log(
                  "count가 2개 이상이고 두번째로 큰 값이 7보다 작거나 같은데, 마지막 조건에 부합하는 경우 : ",
                  dice_num
                );
              }
            }
          }

          arr = [0, 0, 0, 0, 0, 0];
          count = 0;

          console.log("최종 dice_num : ", arr, dice_num);

          // 2) 1,2,3호기 DB count +=1
          await Part.increment(
            { count: 1 },
            { where: { PartDefaultId: 1, MachineId: 1 } }
          );
          if (secondFlag_t == true) {
            await Part.increment(
              { count: 1 },
              { where: { PartDefaultId: 2, MachineId: 1 } }
            );
            final_result = 1;
            // dice_num = dice_num2;
          } else {
            final_result = 2;
          }
          await Part.increment(
            { count: 1 },
            { where: { PartDefaultId: 3, MachineId: 1 } }
          );

          // // 	3) goodsetFlag1_t와 goodsetFlag2_t 같으면 양품(1), 다르면 고품(2)
          // if (goodsetFlag1_t == goodsetFlag2_t) {
          //   final_result = 1;
          // } else if (goodsetFlag1_t != goodsetFlag2_t) {
          //   final_result = 2;
          // } else {
          //   console.log("양품, 고품 판별 불가");
          // }
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
          // console.log(test_result);
          //
          if (!test_result) {
            console.log("final_result : ", final_result);
            await Test_result.create({
              serial_number,
              final_result,
              dice_num,
              MachineId: 1,
            });

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
      console.log("plc data 누수");
      // console.log(error);
    }
  } else if (topic == "machine1") {
    // topic이 machine1인 공정
    // console.log("machine1");
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
      // console.log(machineElementsSorts);

      if (
        // tag 26(belt)가 true이거나 tag 1(Start)이 true이면, machine_status : 1 (동작 중)
        machineElementsSorts[16].value == true ||
        machineElementsSorts[1].value == true
      ) {
        console.log("****************");
        await Machine.update(
          { machine_status: 1 },
          {
            where: {
              id: 2,
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
        // setTimeout(() => {
        //   if (machineElementsSorts[14].value > 0) {
        //     arr.push(machineElementsSorts[14].value);
        //   }
        // }, 1200);

        // 주사위 눈 값 배열에 담고, 가장 빈도수 높은 값 dice_num2에 담기

        if (machineElementsSorts[14].value > 0) {
          // arr.push(machineElementsSorts[14].value);
          switch (machineElementsSorts[14].value) {
            case "1":
              arr[0] = arr[0] + 1;
              break;
            case "2":
              arr[1] = arr[1] + 1;
              break;
            case "3":
              arr[2] = arr[2] + 1;
              break;
            case "4":
              arr[3] = arr[3] + 1;
              break;
            case "5":
              arr[4] = arr[4] + 1;
              break;
            case "6":
              arr[5] = arr[5] + 1;
              break;
            default:
              break;
          }
        }

        // console.log("@@@@@@@@@@@@@@@@@@@");
        // tag 25(No3Gripper)이 true이고, thirdFlag가 true이면,
        if (machineElementsSorts[15].value == true && thirdFlag == true) {
          console.log("first arr : ", arr, dice_num);
          // 1) 변수 재설정
          let secondFlag_t = secondFlag;
          // let goodsetFlag1_t = goodsetFlag1;
          // let goodsetFlag2_t = goodsetFlag2;
          firstFlag = false;
          secondFlag = false;
          thirdFlag = false;
          // goodsetFlag1 = false;
          // goodsetFlag2 = false;
          let count = 0;

          let arr2 = arr.filter((element, index, array) => {
            if (element > 0) {
              count++;
              return element;
            }
          });

          // count가 0보다 큰 값이 하나이면, 그 값이 정답
          if (count == 1) {
            dice_num = arr.indexOf(Math.max(...arr)) + 1;
            console.log("count가 1인 경우 : ", dice_num);
          }

          // count가 0보다 큰 값이 2개 이상이면
          if (count >= 2) {
            arr2.sort(function (a, b) {
              return b - a;
            });
            let firstindex = arr2.indexOf(Math.max(...arr2));
            arr2[firstindex] = 0;

            // 두번째로 큰 값이 10보다 크면
            if (Math.max(...arr2) > 9) {
              let firstindex = arr.indexOf(Math.max(...arr));
              arr[firstindex] = 0;
              dice_num = arr.indexOf(Math.max(...arr)) + 1;
              console.log(
                "count가 2개 이상이고 두번째로 큰 값이 9보다 큰 경우 : ",
                dice_num
              );
              // 두번째로 큰 값이 10보다 작거나 같으면
            } else {
              dice_num = arr.indexOf(Math.max(...arr)) + 1;
              console.log(
                "count가 2개 이상이고 두번째로 큰 값이 9보다 작거나 같은 경우 : ",
                dice_num
              );
            }
          }

          arr = [0, 0, 0, 0, 0, 0];
          count = 0;

          console.log("최종 dice_num : ", arr, dice_num);

          // 2) 1,2,3호기 DB count +=1
          await Part.increment(
            { count: 1 },
            { where: { PartDefaultId: 1, MachineId: 2 } }
          );
          if (secondFlag_t == true) {
            await Part.increment(
              { count: 1 },
              { where: { PartDefaultId: 2, MachineId: 2 } }
            );
            final_result = 1;
            // dice_num = dice_num2;
          } else {
            final_result = 2;
          }
          await Part.increment(
            { count: 1 },
            { where: { PartDefaultId: 3, MachineId: 2 } }
          );

          // // 	3) goodsetFlag1_t와 goodsetFlag2_t 같으면 양품(1), 다르면 고품(2)
          // if (goodsetFlag1_t == goodsetFlag2_t) {
          //   final_result = 1;
          // } else if (goodsetFlag1_t != goodsetFlag2_t) {
          //   final_result = 2;
          // } else {
          //   console.log("양품, 고품 판별 불가");
          // }
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
          // console.log(test_result);
          //
          if (!test_result) {
            console.log("final_result : ", final_result);
            await Test_result.create({
              serial_number,
              final_result,
              dice_num,
              MachineId: 2,
            });

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
              id: 2,
            },
          }
        );
      }
      // }
    } catch (error) {
      console.log("plc data 누수");
      // console.log(error);
    }
  }

  // console.log("the end");
});

// error 처리
client.on("error", (error) => {
  console.log("Can't connect" + error);
  client.end();
});
