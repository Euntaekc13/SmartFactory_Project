/*
[Response status code, message] 

200
success

206
notenough : 원하는 data가 param이나 req에 아예 없거나 부족할 때
invalid : req로 받은 data가 유효하지 않을 때
insufficient : 보낼 data가 없거나 부족할 때
same : 같으면 안 되는데 같을 경우

invalide : invalid email
invalidp : invalid pw
invalidu : invalid user	
different : different UserId


401
expired : token 만료

406
notaccept : not acceptable (이 응답은 서버가 서버 주도 콘텐츠 협상을 수행한 후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.)

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
    message: "insufficient", // 보낼 data가 없거나 부족할 때
  },
  same: {
    code: 206,
    message: "same", // 보낼 data가 없거나 부족할 때
  },

  expired: {
    code: 401,
    message: "expired", // token 만료
  },

  notaccept: {
    code: 406,
    message: "notaccept", // not acceptable (이 응답은 서버가 서버 주도 콘텐츠 협상을 수행한 후, 사용자 에이전트에서 정해준 규격에 따른 어떠한 콘텐츠도 찾지 않았을 때, 웹서버가 보냅니다.)
  },

  invalidt: {
    code: 498,
    message: "invalidt", // invalid token
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
