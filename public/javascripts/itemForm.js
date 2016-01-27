'use strict';

$(document).ready(init);
var id = 0;
var items = [];
function init(e){
    $('.addItem').on('click', handleEntry);
}

function handleEntry(e){
  e.preventDefault();
  $.post('/items', {name: $('input#name').val(), price: $('input#price').val(), picurl: $('input#picurl').val()})
  .success(function(data){
    console.log(data);
  }).fail(function(error){
    console.log('we failed you bruh');
  });
  $('input').val('');
}
