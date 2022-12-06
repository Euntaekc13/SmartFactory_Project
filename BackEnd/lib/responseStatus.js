/*
[Response status code, message] 

200
success

404
invalide : invalid email
invalidp : invalid pw
invalidu : invalid user	
invalidt : invalid token
different : different UserId
expired : token 만료
notenough : 원하는 data가 req에 아예 없거나 부족할 때

500
server error
*/

const resStatus = {
  success: {
    code: 200,
    message: "success",
  },
  invalide: {
    code: 404,
    message: "invalide",
  },
  invalidp: {
    code: 404,
    message: "invalidp",
  },
  invalidu: {
    code: 404,
    message: "invalidu",
  },
  invalidt: {
    code: 404,
    message: "invalidt",
  },
  different: {
    code: 404,
    message: "different",
  },
  expired: {
    code: 404,
    message: "expired",
  },
  notenough: {
    code: 404,
    message: "notenough",
  },
  blank: {
    code: 404,
    message: "blank",
  },
};

// module.exports = { response, resStatus };
module.exports = { resStatus };
