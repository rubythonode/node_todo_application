const express = require('express');
const router = express.Router();
const controller = require('./controller');
const accessToken = require('../../middlewares/accessToken');

router.post('/register', controller.register);
router.post('/login', controller.login);


// 미들웨어 구축
router.use(accessToken);
router.delete('/logout', controller.logout);
// 토큰 인증된 유저만 접근 가능
router.get('/me', controller.me);

module.exports = router;
