const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { allMachineExplorer } = require("../controllers/process");

router.get("/:MachineId", verifyToken, allMachineExplorer); // 설비 전체 정보 조회

module.exports = router;
