const express = require("express");
const router = express.Router();

const { login } = require("../controllers/auth");

router.post("/login", login); // 로그인(admin, user 모두)

module.exports = router;
