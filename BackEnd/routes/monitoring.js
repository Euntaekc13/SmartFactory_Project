const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { monitoringExplorer } = require("../controllers/monitoring");

router.get("/:MachineId", verifyToken, monitoringExplorer); // 공정 모니터링 정보 조회

module.exports = router;
