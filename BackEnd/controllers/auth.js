const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const authservice = require("../service/authService");
const { resStatus } = require("../lib/responseStatus");

// 로그인(admin, user 모두)
exports.login = async (req, res, next) => {
  console.log("POST /auth/login 진입");
  // console.log(req.body);
  try {
    const { employee_number, password } = req.body;

    if (!employee_number || !password) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    const user = await User.findOne({ where: { employee_number } });
    if (!user) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
      });
    }
    // console.log("### : ", user.dataValues.authorization);
    const authorization = user.dataValues.authorization;
    const result = await bcrypt.compare(password, user.password);
    if (!result) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
      });
    } else {
      let token = null;
      if (authorization == "admin") {
        token = jwt.sign(
          {
            authorization: authorization,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "600000m",
            issuer: "KYOL",
          }
        );
      } else {
        token = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: "600000m",
          issuer: "KYOL",
        });
      }

      const user = await User.findOne({
        where: { employee_number },
        attributes: [
          "id",
          "employee_number",
          "email",
          "name",
          "authorization",
          "user_image",
          "phone_number",
        ],
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
};
