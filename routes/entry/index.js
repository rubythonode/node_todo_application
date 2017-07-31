const express = require('express');
const router = express.Router();
const controller = require('./controller');

// 프로젝트 진입점
router.get('/', controller.entry);

module.exports = router;
