const User = require('../../models/user');
const mongoose = require('mongoose')
const { generateHash, compareHash } = require('../../utils/hash');

/*
  [오류처리]

  status: failure
    error: 0, message: '이메일과 비밀번호를 입력하세요.'
    error: 1, message: '비밀번호는 최소 6글자입니다.'
    error: 2, message: '유요하지 않는 이메일 형식입니다.'
    error: 3, message: '이미 존재하는 이메일입니다.'
    error: 4, message: '존재하지 않는 이메일입니다.'
    error: 5, message: '비밀번호가 틀렸습니다.'

  status: success
    message: '추가되었어요!'
    message: '삭제되었어요!'
*/

exports.register = (req, res) => {

  const { email, password } = req.body;


  // 유저 객체 생성

  // 필수 입력 유효성 검사
  if(email == '' || password == '') {
    return res.status(404).json({
      status: 'failure',
      error: '0',
      message: '이메일과 비밀번호를 입력하세요.'
    });
  }

  // 비밀번호 최소 입력 검사
  if(password.length < 6) {
    return res.status(404).json({
      status: 'failure',
      error: '1',
      message: '비밀번호는 최소 6글자입니다.'
    });
  }

  // 이메일 유효성 검사 정규식

  var regExp = /[0-9a-zA-Z][_0-9a-zA-Z-]*@[_0-9a-zA-Z-]+(\.[_0-9a-zA-Z-]+){1,2}$/;
  if(!email.match(regExp)) {
    return res.status(404).json({
      status: 'failure',
      error: '2',
      message: '유요하지 않는 이메일 형식입니다.'
    });
  }


  // 중복 이메일 확인


  const user = new User();

  User.findOne({ 'email': email }).then((exist) => {
    // 만약 이미 존재하는 이메일이라면
    if(exist) {
      return res.status(404).json({
        status: 'failure',
        error: '3',
        message: '이미 존재하는 이메일입니다.'
      });
    }

    // 유효성 검사 통과시 회원 등록(이부분 이슈가 있었다. (프로미스 반환))
    return generateHash(password).then((hash) => {
      user.password = hash;
      user.email = email;

      return user.save().then(() => {
        return user.generateAuthToken();
      }).then((token) => {
        return res.header('x-auth', token).status(200).json({
          status: 'success',
          message: '회원가입되었어요!',
          user,
          token
        })
      }).catch((err) => {
        console.log(err);
      })
    })



  })
}


exports.login = (req, res) => {
  const { email, password } = req.body;

  // 필수 입력 유효성 검사
  if(email == '' || password == '') {
    return res.status(404).json({
      status: 'failure',
      error: '0',
      message: '이메일과 비밀번호를 입력하세요.'
    });
  }

  // 비밀번호 최소 입력 검사
  if(password.length < 6) {
    return res.status(404).json({
      status: 'failure',
      error: '1',
      message: '비밀번호는 최소 6글자입니다.'
    });
  }

  User.findOne({ 'email': email }).then((user) => {
    if(user) { // 유저가 이미 있다면
      return compareHash(password, user.password).then((result) => {
        if(result) {
          // 검증 통과 토큰 반환
          return user.generateAuthToken().then((token) => {
            res.header('x-auth', token).send({user, token});
          })
        } else {
          // 비밀번호 틀렸어!
          return res.status(404).json({
            status: 'failure',
            error: '5',
            message: '비밀번호가 틀렸습니다.'
          });
        }
      })
    } else { // 유저가 없다면
      return res.status(404).json({
        status: 'failure',
        error: '4',
        message: '존재하지 않는 이메일입니다.'
      });
    }
  })
}


exports.logout = (req, res) => {
  const { id, email } = req.user;
  let _user = null;
  // 해당 id의 유효성 검사 실행
  if(!mongoose.Types.ObjectId.isValid(id)) {
      res.render('error');
  }
  User.findOne({ _id: id }).then((user) => {
    if(user) {
      user.tokens = [];
      user.save().then((err, updateUser) => {
        res.json(updateUser);
      })
    }
  })
  res.json(req.user);
}

exports.me = (req, res) => {
  res.send(req.user);
}
