var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

module.exports = function(app) {
  app.set('views', path.resolve(__dirname, '../views'));
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);

  app.use(express.static(path.resolve(__dirname, '../public')));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
}
