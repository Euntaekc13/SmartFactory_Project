const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const {
  updateUserInformation,
  updateUserPassword,
} = require("../controllers/mypage");

router.put("/update/information/:UserId", verifyToken, updateUserInformation); // 회원 정보 수정(이름,이메일,전화번호)
router.put("/update/pw/:UserId", verifyToken, updateUserPassword); // 회원 정보 수정(비밀번호)

module.exports = router;
