const mongoose = require('mongoose');
const { Schema } = require('mongoose');

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
const user = new Schema(({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
}));


module.exports = mongoose.model('user', user);
