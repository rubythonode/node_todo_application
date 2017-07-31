const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const jwt = require('jsonwebtoken');

/*
{
  email: 'webfrontend@naver.com',
  password: 'ryuhangyeong',
  tokens: [{
  access: 'auth',
  token: '12321312fewfe2nfewowfepwojfpoewfjpwejfpowejpofjpwoe'
}]
}
*/

// 유저 스키마 정보
const userSchema = new Schema(({
  email: {
    type: String
  },
  password: {
    type: String
  },
  tokens: [{
    access: {
      type: String
    },
    token: {
      type: String
    }
  }]
}));

userSchema.methods.toJSON = function() {
    var user = this;

    // 객체 반환, 이게 무조건 반환되는 값의 형태를 정해주는건가보다
    var userObject = user.toObject();

    return {
      _id: userObject._id,
      email: userObject.email
    };
}


// methods 인스턴스에 대해서
userSchema.methods.generateAuthToken = function() {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({
    access,
    token
  });

  // 프로미스 반환 이슈가 있었던 부분

  return new Promise((resolve, reject) => {
    return user.save().then(() => {
      resolve(token);
    })
  }).then((token) => {
    return token;
  })
}

// 토큰에 해당하는 유저를 반환
userSchema.statics.findByToken = function(token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');

  } catch(e) {
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  })

}


// mongoose 미들웨어라는 것도 존재한다고 한다. 이것은 참고 코드
/*
userSchema.pre('save', function(next) {
  var user = this;

  if(user.isModified('password')) { // 'password' 가 수정된다면
    // user.password = hash;
    // next();

    bcryptjs.genSalt(10, (err, salt) => {
      bcryptjs.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      }
    })
    }
  })
  } else {
    next();
  }
});
*/
module.exports = mongoose.model('user', userSchema);
