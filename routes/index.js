const express = require('express');
const router = express.Router();

const basic = require('./basic');
const todo = require('./todo');

router.use('/', basic);
router.use('/todo', todo);


module.exports = router;
