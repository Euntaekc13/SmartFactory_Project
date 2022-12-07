const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { resStatus } = require("../lib/responseStatus");

// 로그인
router.GET("/login", async (req, res, next) => {
  console.log("GET /login 진입");
  console.log(req.body);
  const { employee_number, password } = req.body;
  const user = await User.findOne({ where: { employee_number } });
  try {
    if (!employee_number || !password) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (404) 원하는 data가 req에 아예 없거나 부족할 때
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(resStatus.invalidp.code).json({
        message: resStatus.invalidp.message, // (404) invalid pw
      });
    } else {
      const token = jwt.sign(
        {
          employee_number: user.employee_number,
          email: user.email,
          name: user.name,
          authorization: user.authorization,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "60m",
          issuer: "KYOL",
        }
      );
      return res.status(resStatus.success.code).json({
        message: resStatus.success.message, // (200) success
        token,
        data: { user },
      });
    }
  } catch (error) {
    console.error(error);
    next(error);
  }
});
