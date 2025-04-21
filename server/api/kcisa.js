const express = require('express');
const router = express.Router();
const axios = require('axios');

const BASE_URL = 'http://api.kcisa.kr/openapi/API_CCA_148/request';
const SERVICE_KEY = '356b0d91-82e9-43e0-b690-b78a982ec774';

router.get('/', async (req, res) => {
  try {
    const { pageNo = 1, numOfRows = 20 } = req.query;
    console.log('요청 들어옴:', req.query);

    const response = await axios.get(BASE_URL, {
      params: {
        serviceKey: SERVICE_KEY,
        numOfRows,
        pageNo,
        format: 'json'
      },
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': 'application/json'
      }
    });

    console.log('요청 성공');
    res.json(response.data);
  } catch (error) {
    console.error('요청 실패:', error.response?.data || error.message);
    res.status(500).json({
      error: 'KCISA API 호출 실패',
      message: error.response?.data || error.message
    });
  }
});



module.exports = router;
