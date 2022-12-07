/*
[Response status code, message] 

200
success

204
invalide : invalid email
invalidp : invalid pw
invalidu : invalid user	
invalidt : invalid token
different : different UserId

notenough : 원하는 data가 param이나 req에 아예 없거나 부족할 때
invalid : req로 받은 data가 유효하지 않을 때
expired : token 만료
insufficient : 보낼 data가 없거나 부족할 때

500
server error
*/

exports.resStatus = {
  success: {
    code: 200,
    message: "success",
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
  // invalidt: {
  //   code: 204,
  //   message: "invalidt",
  // },
  // different: {
  //   code: 204,
  //   message: "different",
  // },

  notenough: {
    code: 204,
    message: "notenough", // 원하는 data가 param이나 req에 아예 없거나 부족할 때
  },
  invalid: {
    code: 204,
    message: "invalid", // req로 받은 data가 유효하지 않을 때
  },
  expired: {
    code: 204,
    message: "expired", // token 만료
  },
  insufficient: {
    code: 204,
    message: "nothing", // 보낼 data가 없거나 부족할 때
  },
};
