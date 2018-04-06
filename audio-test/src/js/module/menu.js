$(function() {
  $('#navDiv').click(function() {
    $('#menu').toggleClass('openNav');
    $('#navDiv').toggleClass('openNav');

    $('#help').removeClass('openNav');
    $('#helpDiv').removeClass('openNav');

    $('#sound').removeClass('openNav');
    $('#soundDiv').removeClass('openNav');
  });
});

$(function() {
  $('#helpDiv').click(function() {
    $('#menu').removeClass('openNav');
    $('#navDiv').removeClass('openNav');

    $('#help').toggleClass('openNav');
    $('#helpDiv').toggleClass('openNav');

    $('#sound').removeClass('openNav');
    $('#soundDiv').removeClass('openNav');
  });
});

$(function() {
  $('#soundDiv').click(function() {
    $('#menu').removeClass('openNav');
    $('#navDiv').removeClass('openNav');

    $('#help').removeClass('openNav');
    $('#helpDiv').removeClass('openNav');

    $('#sound').toggleClass('openNav');
    $('#soundDiv').toggleClass('openNav');
  });
});
