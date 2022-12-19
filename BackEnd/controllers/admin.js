const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const User = require("../models/user");
const { resStatus } = require("../lib/responseStatus");

// 사용자 리스트 조회 (admin만 가능)
exports.listUser = async (req, res, next) => {
  console.log("GET /admin/auth/list 진입");
  console.log("관리자입니까? : ", req.decoded.authorization);

  try {
    // 관리자인지 확인
    if (req.decoded.authorization != "admin") {
      return res.status(resStatus.notadmin.code).json({
        message: resStatus.notadmin.message, // (206) 관리자가 아님
      });
    }
    // user 전체 정보 조회
    const user = await User.findAll({
      attributes: ["id", "name", "employee_number"],
    });
    // user 정보가 없는 경우
    if (user.length == 0) {
      return res.status(resStatus.insufficient.code).json({
        message: resStatus.insufficient.message, // (206) 보낼 data가 없거나 부족할 때
      });
    }

    // 성공
    return res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // success
      data: { user },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 사용자 등록 (admin만 가능)
exports.joinUser = async (req, res, next) => {
  console.log("POST /admin/auth/join 진입");
  console.log("관리자입니까? : ", req.decoded.authorization);

  try {
    // 관리자인지 확인
    if (req.decoded.authorization != "admin") {
      return res.status(resStatus.notadmin.code).json({
        message: resStatus.notadmin.message, // (206) 관리자가 아님
      });
    }
    // 입력값 받기
    const {
      employee_number,
      name,
      phone_number,
      email,
      password,
      authorization,
    } = req.body;

    console.log(
      employee_number,
      name,
      phone_number,
      email,
      password,
      authorization
    );

    // 입력값 null인지 체크
    if (!employee_number || !email || !name || !password || !authorization) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
      });
    }

    // 등록할 user가 이미 등록되어 있는지 여부 체크
    const userDuplication = await User.findOne({
      where: {
        [Op.or]: [{ employee_number }, { email }],
      },
    });
    // const params = {
    //   employee_number : req.body.employee_number,
    //   email : ,
    //   name,
    //   password,
    //   authorization,
    //   phone_number,
    //   user_image,
    // };

    // 등록할 user가 이미 등록되어 있는지 여부 체크
    // const userDuplication = await User.findAll({
    //   where: {
    //     [Op.or]: [
    //       { employee_number: params.employee_number },
    //       { email: params.email },
    //     ],
    //   },
    // });

    if (userDuplication) {
      console.log("emplyee_number or email Duplication");
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
      });
    }

    // 비밀번호 해쉬
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    // const hashPassword = await bcrypt.hash(password, 12);

    // user 등록
    await User.create({
      employee_number,
      email,
      name,
      password: hashPassword,
      authorization,
      phone_number,
    });

    // 성공
    return res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 사용자 삭제 (admin만 가능)
exports.deleteUser = async (req, res, next) => {
  console.log("DELETE /admin/auth/delete/:UserId 진입");
  console.log("관리자입니까? : ", req.decoded.authorization);

  try {
    // 관리자인지 확인
    if (req.decoded.authorization != "admin") {
      return res.status(resStatus.notadmin.code).json({
        message: resStatus.notadmin.message, // (206) 관리자가 아님
      });
    }

    // 입력값 받기
    const UserId = parseInt(req.params.UserId, 10);
    // 입력값 null 체크
    if (!UserId) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
      });
    }
    // user 삭제
    const user = await User.destroy({
      where: { id: UserId },
    });
    // 삭제할 user가 없다면
    if (!user) {
      return res.status(resStatus.notaccept.code).json({
        message: resStatus.notaccept.message, // (406) not acceptable (이 응답은 서버가 서버 주도 콘텐츠 협상을 수행한 후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.)
      });
    }
    // 성공
    return res.status(resStatus.success.code).json({
      // 200
      message: resStatus.success.message, // success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
