$(document).ready(init);
var $mrow;
var mrowid;
var total = 0;
function init(){
  $('tbody').on('click', '.trash',function(e){
      e.stopPropagation();
      var $row = $(this).closest('tr');
      var rowid = $row.attr('id').substr(4);
      $.ajax({url:'/items/'+rowid, method: 'DELETE'}).success(function(data){
        console.log('data:', data);
        location.reload();
      })
      .fail(function(err) {
        console.log('err:', err);
      });
  });

  $('tbody').on('click', '.update',function(e){
      e.stopPropagation();
      $mrow = $(this).closest('tr');
      mrowid = $mrow.attr('id').substr(4);
      $('#updateItem').modal();
  });

  $('#updateItem').on('click', '.updateItem', function(e){
    $.ajax({url: '/items/'+mrowid, method: 'PUT', data: {name: $('input#mname').val(), price: $('input#mprice').val(), picurl: $('input#mpicurl').val()}});
    $('input').val('');
  });

  $('tbody').on('click', 'tr',function(e){
    var $row = $(this).closest('tr');
    var rowid = $row.attr('id').substr(4);
    location.replace('/items/'+rowid);
  });

  $.get('/items')
    .success(function(data){
      var domstuff = data.map(function(input, index){
      total+= input.price;
      var $button = $('<button>').addClass('btn btn-warning trash btn-sm').append('Remove item');
      var $update = $('<button>').addClass('btn btn-info update btn-sm').append('Update item');
      var $tr = $('#template').clone().attr('id', 'item'+input._id);
      $tr.find('.name').text(input.name);
      $tr.find('.price').text('$'+input.price.toFixed(2));
      $tr.find('.picurl').text(input.picurl);
      $tr.find('.remove').append($button,$update);
      return $tr;
      });
      $('.total').text('$'+total.toFixed(2));
      $('tbody').append(domstuff);
    })
    .fail(function(err) {
      console.error(err);
    });
}
