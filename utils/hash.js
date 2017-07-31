const bcryptjs = require('bcryptjs');


// 비밀번호 보안을 위한 해싱
function generateHash(password) {
  return new Promise((resolve, reject) => {
    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(password, salt, (err, hash) => {
        resolve(hash);
      })
    });
  })
}

/*
password : 우리가 입력받은 패스워드,
hashpassword : 우리가 조회해서 찾은 유저의 비밀번호 해쉬값
*/

// 비교하여 boolean 반환
function compareHash(password, hashPassword) {
  return new Promise((resolve, reject) => {
    bcryptjs.compare(password, hashPassword, (err, result) => {
      resolve(result); // true or false;
    })
  })
}

module.exports = {
  generateHash,
  compareHash
}
