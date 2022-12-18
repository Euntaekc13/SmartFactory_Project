const jwt = require("jsonwebtoken");
const { resStatus } = require("../lib/responseStatus");

// token 유효성 검사
exports.verifyToken = (req, res, next) => {
  try {
    console.log(`token : ${req.headers.authorization}입니다`);
    // console.log("middeleware 진입");
    req.decoded = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    // console.log("req.decode : ", req.decoded);
    return next();
    // return res.status(200).json({
    //   message: "verifyToken success",
    // });
  } catch (error) {
    console.log("error : ", error);
    // console.log("errorname : ", error.name);
    if (error.name === "TokenExpiredError") {
      // 유효기간 초과
      return res.status(resStatus.expired.code).json({
        // 401
        message: resStatus.expired.message,
        // expired token
      });
    }
    return res.status(resStatus.invalidt.code).json({
      // 498
      message: resStatus.invalidt.message,
      // invalidt
    });
  }
};
