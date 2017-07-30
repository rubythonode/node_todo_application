const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const todo = new Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  date: {
    type: String
  }
});

module.exports = mongoose.model('todo', todo);
