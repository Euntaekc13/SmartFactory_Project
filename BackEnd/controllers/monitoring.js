const { Test_result, Machine, Part, Part_default } = require("../models");
const { resStatus } = require("../lib/responseStatus");

// 공정 모니터링 정보 조회
exports.monitoringExplorer = async (req, res, next) => {
  console.log("GET /monitoring/:MachineId 진입");
  try {
    const MachineId = parseInt(req.params.MachineId, 10);
    if (!MachineId) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    const machine = await Machine.findOne({
      where: { id: MachineId },
      include: [
        {
          model: Test_result,
        },
      ],
    });
    const test_result = machine.Test_result;
    // (대안) const test_result = await machine.getTest_results()
    const part = await machine.getParts();
    const part_default = await part.getPart_defaults();
    /* (대안) const part_default = await Part_default.findAll({
       where: { id: part.Part_defaultId },
     }); */

    if (!machine && !part && !part_default && !test_result) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (206) 보낼 data가 없거나 부족할 때
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { machine, part, part_default, test_result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 공정 모니터링 part 실시간 정보 업데이트
exports.partUpdate = async (req, res, next) => {
  console.log("POST /monitoring/update/part/:MachineId 진입");
  console.log(req.body);
  try {
    const MachineId = parseInt(req.params.MachineId, 10);
    const { count, part_type } = req.body;
    console.log("MachineId : ", MachineId);
    console.log("count : ", count);
    console.log("part_type : ", part_type);
    if (!MachineId || count === null || !part_type) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    console.log("############");

    // 받은 part_type에 해당하는 Part_default 데이터 찾기
    const part_default = await Part_default.findOne({
      where: { part_type },
    });
    console.log("part_default : ", part_default);

    // 찾은 Part_default의 id에 해당하는 Part의 count에 받은 count값 더하기
    const part = await Part.increment(
      { count: count },
      { where: { Part_defaultId: part_default.id } }
    );
    console.log("part.count : ", part.count);

    if (!part) {
      return res.status(resStatus.notaccept.code).json({
        message: resStatus.notaccept.message, // (406) not acceptable
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 공정 status 업데이트
exports.machineStatusUpdate = async (req, res, next) => {
  console.log("POST /monitoring/update/machine/:MachineId 진입");
  console.log(req.body);
  try {
    const MachineId = parseInt(req.params.MachineId, 10);
    const { machine_status } = req.body;
    console.log("MachineId : ", MachineId);
    console.log("machine_status : ", machine_status);
    if (!MachineId || machine_status === null) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }
    console.log("############");

    //
    const machine = await Machine.update(
      { machine_status },
      { where: { id: MachineId } }
    );
    console.log("machine : ", machine);

    if (!machine) {
      return res.status(resStatus.notaccept.code).json({
        message: resStatus.notaccept.message, // (406) not acceptable
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// test result 추가
exports.testResultAdd = async (req, res, next) => {
  console.log("POST /monitoring/add/result/:MachineId 진입");
  console.log(req.body);
  try {
  } catch (error) {
    console.error(error);
    next(error);
  }
};
