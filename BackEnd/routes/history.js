const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { productionHistoryExplorer } = require("../controllers/history");

router.post("/", verifyToken, productionHistoryExplorer); // 생산 이력 조회

module.exports = router;
