const { Machine } = require("../models");
const { resStatus } = require("../lib/responseStatus");

// 공정 전체 정보 조회
exports.line = async (req, res, next) => {
  console.log("GET / 진입");
  try {
    const machine = await Machine.findAll({
      attributes: [
        "machine_name",
        "machine_status",
        "manager",
        "information",
        "mqtt_name",
        "mqtt_port",
        "mqtt_topic",
      ],
    });
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
