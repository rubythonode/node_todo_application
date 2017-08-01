/*
토큰에 의한 접근 권한에 관련된 미들웨어

  검사 완료된 경우, next()
  그렇지 못한 경우, 401

*/
const User = require('../models/user');

module.exports = function(req, res, next) {
  var token = req.header('x-auth'); // 헤더 정보에 포함된 x-auth 정보를 가지고 온다.
  
  User.findByToken(token).then((user) => {
    if(!user) {
      return Promise.reject();
    }

    req.user = user;
    req.token = token;
    next();
  }).catch((e) => {
    res.status(401).json({
      'message': '접근 권한이 없습니다.'
    });
  })

}
