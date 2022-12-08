const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const {
  monitoringExplorer,
  partUpdate,
  machineStatusUpdate,
  testResultAdd
} = require("../controllers/monitoring");

router.get("/:MachineId", verifyToken, monitoringExplorer); // 공정 모니터링 정보 조회

// router.post("/add/:MachineId",  partUpdate); // 공정 모니터링 part 실시간 정보 업데이트 

router.post("/update/part/:MachineId",  partUpdate); // 공정 모니터링 part 실시간 정보 업데이트 
// router.post("/update/part/:MachineId", verifyToken, partUpdate); // 공정 모니터링 part 실시간 정보 업데이트 

// router.post("/update/machine/:MachineId", verifyToken, machineStatusUpdate) // 공정 status 업데이트

// router.post("/add/result/:MachineId", verifyToken, testResultAdd) // test result 추가

module.exports = router;
