'use strict';

var express = require('express');
var router = express.Router();

var Item = require('../models/item');

router.get('/', function(req, res, next) {
  Item.find({}, function(err, items) {
    console.log('errgettingitems:', err);
    console.log('items:', items);
    res.send(items);
  });
});

router.post('/', function(req, res) {
  var item = new Item(req.body);
  console.log('item:', item);
  item.save(function(err, saveditem) {
    console.log('errsavingitem:', err);
    console.log('saveditem:', saveditem);
    res.send(saveditem);
  });
});

router.delete('/:id', function(req, res, next) {
  Item.remove({_id: req.params.id}, function(err) {
    if (err) {
      console.log('cant remove!');
      res.status(400).send(err);
    } else {
      console.log('removed!');
      res.send('success!');
    }
  });
});

router.get('/:id', function(req, res) {
  Item.findById(req.params.id, function(err, item) {
    console.log('item is:'+item);
    res.render('item', item);
  });
});

router.put('/:id', function(req,res){
  console.log(req.params.id);
  console.log(req.body);
  Item.update({_id: req.params.id}, {$set : req.body}, function(err){
    res.send('ok');
  });

});

module.exports = router;
