const mongoose = require('mongoose');
const { Schema } = require('mongoose');


// todo list 스키마 정보
const todoSchema = new Schema({
  text: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: String
  }
});

module.exports = mongoose.model('todo', todoSchema);
