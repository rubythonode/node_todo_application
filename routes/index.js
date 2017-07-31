const express = require('express');
const router = express.Router();

const entry = require('./entry');
const todo = require('./todo');

// user
const user = require('./user');

router.use('/', entry);
router.use('/todo', todo);

router.use('/user', user);

module.exports = router;
