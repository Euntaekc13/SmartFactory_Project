const { sequelize } = require("./models");
const mqtt = require("mqtt");
const Element = require("./models/element");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });

const client = mqtt.connect("mqtt://localhost:1883");

client.on("connect", () => {
  console.log("connected" + client.connected);
});

client.subscribe("myEdukit");

client.on("message", (topic, message, packet) => {
  console.log("###########");
  // message가 buffer로 오므로 JSON으로 변환
  const rareElements = JSON.parse(message.toString());
  // tag의 number로 해당 tag의 정보를 부를 수 있게 tag의 number를 키값으로 값는 객체로 재정리
  const machineElements = rareElements.Wrapper;
  // console.log(machineElements[0].tagId)
  const elements = {};

  for (i = 0; i < machineElements.length; i++) {
    const tagNumber = machineElements[i].tagId;
    elements[tagNumber] = machineElements[i];
  }

  // 받은 데이터 모두 DB에 저장
  for (i = 0; i < machineElements.length; i++) {
    if (elements[i + 1]) {
      // 어떤 데이터들은 전송되지 않았을 수도 있어서 없는 key값도 있기 때문에 필터해줘야 한다.
      Element.create({
        tagId: i + 1,
        name: elements[i + 1]["name"],
        value: elements[i + 1].value,
      });
      console.log(`${elements[i + 1]["name"]}에 대한 정보가 DB에 추가`);
    }
  }
  console.log("the end");
});

client.on("error", (error) => {
  console.log("Can't connect" + error);
  client.end();
});
