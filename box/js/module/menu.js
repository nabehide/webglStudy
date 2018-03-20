$(function() {
  $('#navDiv').click(function() {
    console.log("navDiv");
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
    console.log("helpDiv");
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
    console.log("soundDiv");
    $('#menu').removeClass('openNav');
    $('#navDiv').removeClass('openNav');

    $('#help').removeClass('openNav');
    $('#helpDiv').removeClass('openNav');

    $('#sound').toggleClass('openNav');
    $('#soundDiv').toggleClass('openNav');
  });
});
