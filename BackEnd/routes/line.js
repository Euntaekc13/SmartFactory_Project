const express = require("express");
const router = express.Router();

const { verifyToken } = require("../controllers/middlewares");

const { line } = require("../controllers/line");

router.get("/", verifyToken, line); // 공정 전체 정보 조회

module.exports = router;
