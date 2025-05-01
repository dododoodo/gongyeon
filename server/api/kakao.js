const express = require('express');
const kakao = express.Router();
const axios = require('axios');
const { MongoClient } = require('mongodb');

const CLIENT_REDIRECT_URI = 'https://gongyeon-38pt.vercel.app/kakao/redirect';

const uri = "mongodb+srv://nsa10050:rlaehdus0823@gotoashow.9ufcsbx.mongodb.net/?retryWrites=true&w=majority&appName=gotoashow";
const client = new MongoClient(uri);
let collection;

async function dataCtrl() {
    await client.connect();
    const db = client.db('gotoashow');
    collection = db.collection('member');
    console.log("MongoDB 연결");
}

kakao.get('/', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://gongyeon-38pt.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    try {
        await dataCtrl();
        const { code } = req.query;

        if (!code) {
            return res.status(400).json({ error: 'Authorization code is missing' });
        }

        const tokenResponse = await axios.post("https://kauth.kakao.com/oauth/token", null, {
            headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
            params: {
                grant_type: "authorization_code",
                client_id: "f26d70de4f91fb13430539fe82bcebfc",
                redirect_uri: CLIENT_REDIRECT_URI,
                code
            }
        });

        const access_token = tokenResponse.data.access_token;
        if (!access_token) {
            return res.status(500).json({ error: 'Access token missing' });
        }

        const userResponse = await axios.post("https://kapi.kakao.com/v2/user/me", null, {
            headers: {
                "Authorization": `Bearer ${access_token}`,
                "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
            }
        });

        const userData = userResponse.data;

        const existingUser = await collection.findOne({ id: userData.id });
        if (!existingUser) {
            await collection.insertOne({
                id: userData.id,
                name: userData.properties.nickname
            });
        }

        return res.json({
            access_token,
            properties: userData.properties
        });
    } catch (err) {
        console.error('카카오 로그인 에러:', err.response?.data || err.message);
        return res.status(500).json({ error: '카카오 로그인 중 서버 에러 발생' });
    }
});


kakao.post('/logout', async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', 'https://gongyeon-38pt.vercel.app');
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    const { access_token } = req.body;

    if (!access_token) {
        return res.status(400).json({ error: 'Access token is required' });
    }

    const logoutResponse = await axios.post(
        'https://kapi.kakao.com/v1/user/logout',
        {},
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        }
    );

    res.status(200).json({ success: true });
});

module.exports = kakao;
