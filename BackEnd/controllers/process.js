const { Part, Part_default, Software_history } = require("../models");
const { resStatus } = require("../lib/responseStatus");

// 설비 전체 정보 조회
exports.allMachineExplorer = async (req, res, next) => {
  console.log("GET /process/:MachineId 진입");

  try {
    const MachineId = parseInt(req.params.MachineId, 10);
    if (!MachineId) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }

    const part = await Part.findAll({
      where: { MachineId: MachineId },
      include: [
        {
          model: Part_default,
        },
      ],
    });

    const software_history = await Software_history.findAll({
      where: { MachineId: MachineId },
      order: [["createdAt", "DESC"]],
    });

    if (part.length == 0 && !software_history.length == 0) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (206) 보낼 data가 없거나 부족할 때
      });
    }
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { part, software_history },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
