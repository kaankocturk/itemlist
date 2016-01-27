'use strict';

var mongoose = require('mongoose');

var itemSchema = new mongoose.Schema({
  name: String,
  price: Number,
  picurl: String
});

var Item = mongoose.model('Item', itemSchema);

module.exports = Item;
