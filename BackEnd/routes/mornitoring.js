const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { Test_result, Machine, Part, Part_default } = require("../models");

// connect할 MQTT 정보 조회
router.GET("/mornitoring/:MachineId", verifyToken, async (req, res, next) => {
  console.log("GET /mornitoring/:MachineId 진입");
  const MachineId = parseInt(req.params.MachineId, 10);
  try {
    if (!MachineId) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (404) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    const mqtt_information = await Machine.findOne({
      where: { id: MachineId },
      attributes: ["mqtt_host", "mqtt_name", "mqtt_topic"],
    });
    if (!mqtt_information) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (200) 보낼 data가 없거나 부족할 때
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { mqtt_information },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 공정 모니터링 정보 조회
router.GET("/~~~", async (req, res, next) => {
  console.log("GET /~~~~ 진입");
  const MachineId = parseInt(req.params.MachineId, 10);
  try {
    if (!MachineId) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (404) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    const machine = await Machine.findOne({
      where: { id: MachineId },
      include: [
        {
          model: Test_result,
        },
      ],
    });
    const test_result = machine.Test_result;
    // (대안) const test_result = await machine.getTest_results()
    const part = await machine.getParts();
    const part_default = await part.getPart_defaults();
    // (대안) const part_default = await Part_default.findAll({
    //   where: { id: part.Part_defaultId },
    // });
    if (!machine && !part && !part_default && !test_result) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (200) 보낼 data가 없거나 부족할 때
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { machine, part, part_default, test_result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 공정 모니터링 실시간 정보 추가
router.POST("/~~~", async (req, res, next) => {
  console.log("POST /~~~~ 진입");
  console.log(req.body);
  const MachineId = parseInt(req.params.MachineId, 10);
  try {
    /*
    1) 1호기, 2호기, 3호기 각 결과값이 통과했는지 여부를 어디 DB에 update. 
    2) final_result를 Test_result DB에 add.  
   (1, 2, 3호기 part_status가 전부 ‘정상’이어야 final result가 pass.  / 아니면 fail 이 되도록 로직) 
    */
  } catch (error) {
    console.error(error);
    next(error);
  }
});
