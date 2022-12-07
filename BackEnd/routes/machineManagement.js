const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { Part, Part_default, Software_history } = require("../models");

// // 설비 전체 정보 조회
router.get("/all", verifyToken, async (req, res, next) => {
  console.log("GET /machine/all 진입");
  try {
    const part = await Part.findAll();
    const part_default = await Part_default.findAll();
    const software_history = await Software_history.findAll();
    if (!part && !part_default && !software_history) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (200) 보낼 data가 없거나 부족할 때
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { part, part_default, software_history },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

// software history 정보 추가
router.post("/:MachineId/swhistory", verifyToken, async (req, res, next) => {
  console.log("POST /machine/:MachineId/swhistory 진입");
  try {
    const MachineId = parseInt(req.params.MachineId, 10);
    const { part_type, software_version, detail } = req.body;
    if (!MachineId || !part_type || !software_version) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (204) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    await Software_history.create({
      MachineId,
      part_type,
      software_version,
      detail,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});

module.exports = router;
