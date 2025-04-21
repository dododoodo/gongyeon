const express = require('express');
const kakao = express.Router();
const cors = require('cors');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const CLIENT_REDIRECT_URI = 'https://gongyeon-38pt.vercel.app/kakao/redirect';

const uri = "mongodb+srv://nsa10050:rlaehdus0823@gotoashow.9ufcsbx.mongodb.net/?retryWrites=true&w=majority&appName=gotoashow";
const client = new MongoClient(uri);
let collection;

async function dataCtrl() {
    try {
        await client.connect();
        const db = client.db('gotoashow');
        collection = db.collection('member');
        console.log("MongoDB 연결 완료");
    } catch (error) {
        console.error("MongoDB 연결 실패:", error.message);
    }
}


kakao.get('/', async function (req, res) {

    dataCtrl();
    const { code } = req.query;

    if (!code) {
        console.error('Authorization code is missing');
        return res.status(400).json({ error: 'Authorization code is missing' });
    }

    try {
        console.log('카카오 로그인 요청 code:', code);

        // 카카오 API로 토큰 요청
        let tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token", null, {
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
            params: {
                grant_type: "authorization_code",
                client_id: "f26d70de4f91fb13430539fe82bcebfc",
                redirect_uri: CLIENT_REDIRECT_URI,
                code
            }
        });

        if (!tokenResponse.data.access_token) {
            console.error('Access token missing');
            return res.status(500).json({ error: 'Access token missing' });
        }

        const access_token = tokenResponse.data.access_token;

        let userResponse = await axios.post("https://kapi.kakao.com/v2/user/me", null, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        });

        const userData = userResponse.data;
        console.log('카카오 사용자 정보:', userData);

        let existingUser = await collection.findOne({ id: userData.id });
        console.log(existingUser,'---몽고디비---')

        if (!existingUser) {
            await collection.insertOne({
                id: userData.id,
                name: userData.properties.nickname
            });
            console.log('새 사용자 추가:', userData.properties.nickname);
        }

        res.json({
            access_token,
            properties: userData.properties
        });

    } catch (error) {
        console.error("카카오 로그인 처리 중 오류 발생:", error.response?.data || error.message);
        res.status(500).json({
            error: '카카오 로그인 처리 중 오류 발생',
            details: error.response?.data || error.message
        });
    }
});

module.exports = kakao;
