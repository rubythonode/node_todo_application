const mongoose = require('mongoose');


module.exports = function() {
  mongoose.Promise = global.Promise;
  mongoose.connect('mongodb://localhost/todoapp');

  const db = mongoose.connection;

  db.on('error', (error) => {
    console.log(error);
  });

  db.once('open', () => {
    console.log('Connection to mongoose server');
  });
}
