const dateFormat = require('dateformat');

var now = new Date();

var date = dateFormat(now, "yyyy-mm-dd h:MM:ss");

module.exports = function() {
  return date;
};
