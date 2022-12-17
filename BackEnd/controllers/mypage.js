const bcrypt = require("bcrypt");
const { Test_result, Machine, Part, Part_default, User } = require("../models");
const { resStatus } = require("../lib/responseStatus");

// 회원 정보 수정 (이름,이메일,전화번호)
exports.updateUserInformation = async (req, res, next) => {
  console.log("PUT /mypage/update/information/:UserId 진입");
  try {
    // 입력값 할당
    const UserId = parseInt(req.params.UserId, 10);
    const { email, name, phone_number } = req.body;

    // 입력값 null 체크
    if (!UserId || !email || !name || !phone_number) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }

    // user 정보 upate
    const user = await User.update(
      { email: email, name: name, phone_number: phone_number },
      {
        where: { id: UserId },
      }
    );

    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
      data: { user },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// 회원 정보 수정 (비밀번호)
exports.updateUserPassword = async (req, res, next) => {
  console.log("PUT /mypage/update/pw/:UserId 진입");
  try {
    // 입력값 할당
    const UserId = parseInt(req.params.UserId, 10);
    const { currentPassword, newPassword } = req.body;
    console.log(UserId, currentPassword, newPassword);

    // 입력값 null 체크
    if (!UserId || !currentPassword || !newPassword) {
      return res.status(resStatus.notenough.code).json({
        message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
      });
    }

    // 현재 password 일치 여부 체크
    const user = await User.findOne({ where: { id: UserId } });
    console.log(user.password);
    const result = await bcrypt.compare(currentPassword, user.password);
    console.log(result);
    if (!result) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
      });
    }

    // 현재 password와 new password 일치 여부 체크
    if (currentPassword == newPassword) {
      return res.status(resStatus.invalid.code).json({
        message: resStatus.same.message, // (206) current password와 new password가 같을 때
      });
    }

    // 새로운 password 해쉬
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(newPassword, salt);

    // 새로운 password update
    await User.update(
      { password: hashPassword },
      {
        where: { id: UserId },
      }
    );

    return res.status(resStatus.success.code).json({
      message: resStatus.success.message, // (200) success
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
