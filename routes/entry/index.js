const express = require('express');
const router = express.Router();
const controller = require('./controller');

// 프로젝트 진입점
router.get('/', controller.entry);
router.get('/login', controller.login);
router.get('/register', controller.register);
module.exports = router;
