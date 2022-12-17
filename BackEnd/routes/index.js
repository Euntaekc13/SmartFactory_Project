const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const machineRouter = require("./machine");
const monitoringRouter = require("./monitoring");
const processManagementRouter = require("./process");
const productionHistoryRouter = require("./history");
const mypageRouter = require("./mypage");
const adminRouter = require("./admin");

router.use("/auth", authRouter);
router.use("/machine", machineRouter);
router.use("/monitoring", monitoringRouter);
router.use("/process", processManagementRouter);
router.use("/history", productionHistoryRouter);
router.use("/mypage", mypageRouter);
router.use("/admin", adminRouter);

module.exports = router;
