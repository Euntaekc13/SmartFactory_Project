const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const {
  allMachineExplorer,
  softwareHistoryAdd,
} = require("../controllers/machineManagement");

router.get("/all", verifyToken, allMachineExplorer); // 설비 전체 정보 조회
router.post("/:MachineId/swhistory", verifyToken, softwareHistoryAdd); // software history 정보 추가

module.exports = router;
