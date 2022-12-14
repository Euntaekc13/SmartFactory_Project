const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const machineRouter = require("./machine");
const monitoringRouter = require("./monitoring");
const processManagementRouter = require("./process");
const productionHistoryRouter = require("./history");

router.use("/auth", authRouter);
router.use("/machine", machineRouter);
router.use("/monitoring", monitoringRouter);
router.use("/process", processManagementRouter);
router.use("/history", productionHistoryRouter);

module.exports = router;
