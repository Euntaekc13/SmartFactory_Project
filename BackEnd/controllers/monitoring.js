const { Test_result, Machine, Part, Part_default, User } = require("../models");
const { resStatus } = require("../lib/responseStatus");
const { Op } = require("sequelize");

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
        {
          model: Part,
          include: [
            {
              model: Part_default,
            },
          ],
        },
        {
          model: User,
          attributes: ["name", "email", "phone_number", "user_image"],
        },
      ],
    });

    const todayForm = new Date();
    const year = todayForm.getFullYear();
    const month = todayForm.getMonth() + 1;
    const date = todayForm.getDate();
    const today = () => `${year}-${month}-${date}`;
    console.log(today());

    const machine2 = await Machine.findOne({
      where: { id: MachineId },
      include: [
        {
          model: Test_result,
          where: {
            createdAt: {
              [Op.gte]: today(),
            },
          },
        },
      ],
    });

    console.log(machine2);

    const part = machine.dataValues.Parts;
    const test_result = machine.dataValues.Test_results;

    const manager = machine.dataValues.User;
    let today_final_result = [];
    if (machine2) {
      today_final_result = machine2.dataValues.Test_results;
    }
    console.log(today_final_result);
    // console.log("~~~~~:", machine2);

    // console.log(machine2);
    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { machine, part, test_result, today_final_result, manager },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
