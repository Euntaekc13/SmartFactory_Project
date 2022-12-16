const express = require("express");
const router = express.Router();

const { join, login } = require("../controllers/auth");

router.post("/join", join); // 회원가입(로그인용)
router.post("/login", login); // 로그인

module.exports = router;
