const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { Test_result, Machine, Part, Part_default } = require("../models");

// 공정 모니터링 정보 GET
router.GET("/~~~", verifyToken, async (req, res, next) => {
  console.log("GET /~~~~ 진입");
  console.log(req.body);
  const { MachineId } = req.body;
  try {
    const machine = Machine.findAll({
      where: { id: MachineId },
    });
    const part = Part.findAll({
      where: { MachineId: MachineId },
    });
    const testResult = Test_result.findAll({
      where: { MachineId: MachineId },
    });
    const partDefault = part.getPart_defaults();
    // const partDefault = Part_default.findAll({
    //   where: { id: part.Part_defaultId },
    // });
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { machine, part, partDefault, testResult },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// 공정 모니터링 실시간 정보 POST
router.POST("/~~~", async (req, res, next) => {
  console.log("POST /~~~~ 진입");
  console.log(req.body);
  // const { }  =
});
