const express = require('express');
const router = express.Router();
const utilsDB = require('../services/utilsDB')

router.get('/', async (req, res, next) => {
  let superMarkets = await utilsDB.getCollection('superMarkets');
  
  res.render('index', { title: 'Gestión de productos para Tu Super Mercado', secondTitle: 'Manage your Products', superMarkets: superMarkets });
});

router.get('/products', async (req, res, next) => {
  let productos = await utilsDB.getCollection('products');
  utilsDB.addDocument('superMarkets', [{propName:'nombre', propValue:req.query.superMarket}]);
  res.render('productsSuperMarket', { superMarket: req.query.superMarket || 'Supermercado', productos });
});

module.exports = router;
