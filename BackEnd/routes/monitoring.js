const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const {
  monitoringExplorer,
  monitoringInformationAdd,
} = require("../controllers/monitoring");

router.get("/:MachineId", verifyToken, monitoringExplorer); // 공정 모니터링 정보 조회
// router.post("/add/:MachineId", verifyToken, monitoringInformationAdd); // 공정 모니터링 실시간 정보 추가

module.exports = router;
