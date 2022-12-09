const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { resStatus } = require("../lib/responseStatus");

// 로그인을 위한 회원가입(관리자만 접근)
exports.join = async (req, res, next) => {
    console.log("POST /login/join 진입");
    console.log(req.body);
    try {
        const { employee_number, email, name, password, authorization } =
            req.body;

        const employee_numberDuplication = await User.findOne({
            where: { employee_number },
        });
        const emailDuplication = await User.findOne({
            where: { email },
        });

        if (employee_numberDuplication || emailDuplication) {
          console.log("emplyee_number or email Duplication")
            return res.status(resStatus.invalid.code).json({
                message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
            });
        }

        const hash = await bcrypt.hash(password, 12);
        await User.create({
            employee_number,
            email,
            name,
            password: hash,
            authorization,
        });

        return res.status(resStatus.success.code).json({
            // 200
            message: resStatus.success.message, // success
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
};

// 로그인
exports.login = async (req, res, next) => {
    console.log("POST /login 진입");
    console.log(req.body);
    try {
        const { employee_number, password } = req.body;
        const user = await User.findOne({ where: { employee_number } });
        if (!employee_number || !password) {
            return res.status(resStatus.notenough.code).json({
                message: resStatus.notenough.message, // (206) 원하는 data가 param이나 req에 아예 없거나 부족할 때
            });
        }

        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            return res.status(resStatus.invalid.code).json({
                message: resStatus.invalid.message, // (206) req로 받은 data가 유효하지 않을 때
            });
        } else {
            const token = jwt.sign({}, process.env.JWT_SECRET, {
                expiresIn: "60m",
                issuer: "KYOL",
            });
            const user = await User.findOne({
                where: { employee_number },
                attributes: [
                    "id",
                    "employee_number",
                    "email",
                    "name",
                    "authorization",
                ],
            });

            return res.status(resStatus.success.code).json({
                message: resStatus.success.message, // (200) success
                token,
                data: { user },
            });
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
};
