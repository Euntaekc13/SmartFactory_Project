/*
[Response status code, message] 

200
success

206
invalide : invalid email
invalidp : invalid pw
invalidu : invalid user	
different : different UserId

notenough : 원하는 data가 param이나 req에 아예 없거나 부족할 때
invalid : req로 받은 data가 유효하지 않을 때
insufficient : 보낼 data가 없거나 부족할 때

401
expired : token 만료

498
invalidt : invalid token

500
server error
*/

exports.resStatus = {
    success: {
        code: 200,
        message: "success",
    },
    notenough: {
        code: 206,
        message: "notenough", // 원하는 data가 param이나 req에 아예 없거나 부족할 때
    },
    invalid: {
        code: 206,
        message: "invalid", // req로 받은 data가 유효하지 않을 때
    },
    insufficient: {
        code: 206,
        message: "nothing", // 보낼 data가 없거나 부족할 때
    },
    expired: {
        code: 401,
        message: "expired", // token 만료
    },
    invalidt: {
        code: 498,
        message: "invalidt",
    },

    // invalide: {
    //   code: 204,
    //   message: "invalide",
    // },
    // invalidp: {
    //   code: 204,
    //   message: "invalidp",
    // },
    // invalidu: {
    //   code: 204,
    //   message: "invalidu",
    // },
    // different: {
    //   code: 204,
    //   message: "different",
    // },
};
