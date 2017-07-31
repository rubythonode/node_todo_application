const express = require('express');
const router = express.Router();

const entry = require('./entry');
const todo = require('./todo');

// user
const user = require('./user');
router.use('/user', user);
router.use('/', entry);
router.use('/todo', todo);



module.exports = router;
