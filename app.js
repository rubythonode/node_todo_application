// express 웹 프레임워크
const express = require('express');
const app = express();

// db 연동 함수 불러오기
const db = require('./db/mongoose_connect');

// config 불러오기

const expressConfig = require('./config/expressConfig');

// 라우터 불러오기
const routes = require('./routes');
// 포트 설정
const PORT = 3000;

// db 연동
db();
// 설정 함수 실행
expressConfig(app);

// 라우터 설정
app.use('/', routes)

// 리스너
app.listen(PORT, () => console.log(`Server Running! PORT: ${PORT}`))
