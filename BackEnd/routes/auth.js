const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { resStatus } = require("../lib/responseStatus");

// 로그인
router.GET("/", async (req, res, next) => {
  console.log("GET /login 진입");
  console.log(req.body);
  try {
    const { employee_number, password } = req.body;
    const user = await User.findOne({ where: { employee_number } });
    if (!employee_number || !password) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (204) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }

    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (204) req로 받은 data가 유효하지 않을 때
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
      const user = await User.findOne({
        where: { employee_number },
        attributes: ["id", "employee_number", "email", "name", "authorization"],
      });

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
