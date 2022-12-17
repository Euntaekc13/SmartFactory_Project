const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const {
  updateUserInformation,
  updateUserPassword,
} = require("../controllers/mypage");

router.put("/update/information/:UserId", verifyToken, updateUserInformation); // 공정 모니터링 정보 조회
router.put("/update/pw/:UserId", verifyToken, updateUserPassword); // 공정 모니터링 정보 조회

module.exports = router;
