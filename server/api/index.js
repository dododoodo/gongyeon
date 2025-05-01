const cors = require('cors');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const kakao = require('./kakao');
const naver = require('./naver');
const kcisa = require('./kcisa');

// CORS 설정
app.use(cors({
    origin: 'https://gongyeon-38pt.vercel.app',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/kakao', kakao);
app.use('/naver', naver);
app.use('/kcisa', kcisa);

module.exports = app;
