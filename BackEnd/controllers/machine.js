const {
  Machine,
  User,
  Part,
  Part_default,
  Software_history,
} = require("../models");
const { resStatus } = require("../lib/responseStatus");

// 공정 전체 정보 조회
exports.machine = async (req, res, next) => {
  console.log("GET /machine 진입");
  try {
    const machine = await Machine.findAll({
      // attributes: [
      //   "id",
      //   "machine_name",
      //   "machine_status",
      //   "information",
      //   "mqtt_name",
      //   "mqtt_port",
      //   "mqtt_topic"
      // ],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: Part,
          include: [
            {
              model: Part_default,
            },
          ],
        },
        {
          model: Software_history,
        },
      ],
    });

    // const user = machine.dataValues.Users
    // const part = machine.dataValues.Parts;
    // const software_history = machine.dataValues.Software_histories
    // console.log("~~~ : ", machine[0]);

    if (!machine) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (206) 보낼 data가 없거나 부족할 때
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { machine },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
