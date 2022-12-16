const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const { machine } = require("../controllers/machine");

router.get("/", verifyToken, machine); // 공정 전체 정보 조회

module.exports = router;
