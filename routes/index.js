var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');
var itemObj;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Your item List' });
});

router.get('/itemform', function(req, res) {
  res.render('itemForm');
});

router.get('/itemlist', function(req, res) {
  res.render('itemlist');
});

module.exports = router;
