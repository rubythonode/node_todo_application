var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');

module.exports = function(app) {
  // 익스프레스와 관련된 환경 설정
  app.set('views', path.resolve(__dirname, '../views'));

  // 템플릿 엔진 EJS
  app.set('view engine', 'ejs');
  app.engine('html', require('ejs').renderFile);

  // 정적 파일 public
  app.use(express.static(path.resolve(__dirname, '../public')));

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded());
}
