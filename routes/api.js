const express = require('express');
const router = express.Router();
const utilsDB = require('../services/utilsDB')
const cors = require('cors');

const corsOptions = {
  origin: 'https://eltiempo.com',
  "methods": "GET,PUT,POST,DELETE",
  "preflightContinue": true,
  optionsSuccessStatus: 200
}

router.post('/products', cors(), async (req, res, next) => {
  const props = [{propName: 'descripcion', propValue: req.body.descripcion},{propName: 'idSuperMarket', propValue: req.body.superMarket},{propName: 'nombre', propValue: req.body.nombre}]
  utilsDB.addDocument('products', props);
  res.json('ready')
});

module.exports = router;
