const { Test_result, Machine } = require("../models");
const { resStatus } = require("../lib/responseStatus");
const { Op } = require("sequelize");

// 생산 이력 조회
exports.productionHistoryExplorer = async (req, res, next) => {
  try {
    console.log("POST /history 진입");

    // (검색 원하는 요소들)
    // 1. 필수
    // 1) start_date : 시작 날짜
    // 2) end_date : 마지막 날짜

    // 2. 선택 (안 보내면 null)
    // 1) MachineId : 공정
    // 2) final_result : 양품이면 1, 고품이면 0
    // 3) dice_num : 주사위 눈

    const { start_date, end_date, MachineId, final_result, dice_num } =
      req.body.historyData;
    console.log("req.body.historyData : ", req.body.historyData);
    // if (!MachineId) {
    //   MachineId = 2;
    // }
    console.log(start_date, end_date, MachineId, final_result, dice_num);

    if (!start_date || !end_date) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (206) 보낼 data가 없거나 부족할 때
      });
    }

    const startDate = new Date(start_date);
    const endDate = new Date(end_date);
    const dayAfterEndDate = new Date(endDate.setDate(endDate.getDate() + 1));

    const test_result = await Test_result.findAll({
      where: {
        [Op.and]: [
          {
            createdAt: {
              [Op.and]: [{ [Op.gte]: startDate }, { [Op.lt]: dayAfterEndDate }],
            },
          },
          { MachineId: MachineId || { [Op.ne]: null } }, // !null, !undefined 이라 하면 1로 인식. [Op.ne] : ne operator는 != 과 동일

          { final_result: final_result || { [Op.ne]: null } },

          { dice_num: dice_num || { [Op.ne]: null } },
        ],
      },
      include: [
        {
          model: Machine,
        },
      ],
    });

    // if (!test_result) {
    //   return res.status(resStatus.insufficient.code).json({
    //     message: resStatus.insufficient.message, // (206) 보낼 data가 없거나 부족할 때
    //   });
    // }

    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { test_result },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
