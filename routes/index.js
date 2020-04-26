const express = require('express');
const router = express.Router();
const axios = require('axios')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Gestión de productos para Tu Super Mercado', secondTitle: 'Manage your Products' });
});

router.get('/products', function(req, res, next) {
  res.render('products', { superMarket: req.body.superMarket || 'Supermercado' });
});

module.exports = router;
