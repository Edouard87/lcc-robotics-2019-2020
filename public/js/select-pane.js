var defaultBackground = $(".settings-option").css("background")
var defaultBorder = $(".settings-option").css("border")

$(".settings-option").on('click', function () {

  $(".description-wrapper").css("display", "block");

  $(".settings-option").css("background", defaultBackground);
  $(".settings-option").css("border", defaultBorder);

  $(this).css("background", "rgb(204,205,251)");
  $(this).css("border", "1px solid rgb(95,96,110)");

});