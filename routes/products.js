const express = require('express');
const router = express.Router();
const analyzeWebs = require('../services/products')
const cors = require('cors');

const corsOptions = {
  origin: 'https://eltiempo.com',
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": true,
  optionsSuccessStatus: 200
}

/* GET users listing. */
router.get('/products', cors(), analyzeWebs);
// router.put('/:id', cors(corsOptions), SCRAPING.updateUserPassword);

module.exports = router;
