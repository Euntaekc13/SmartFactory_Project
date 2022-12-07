const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/middlewares");

const Machine = require("../models/machine");

// 공정 전체 정보 조회
router.GET("/", verifyToken, async (req, res, next) => {
  console.log("GET / 진입");
  const machine = await Machine.findAll;
  try {
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { machine },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
});
