(function ($) {
  $(window).on("load", function () {
    $("body").mCustomScrollbar({
      theme: "3d-thick-dark"
    });
  });
})(jQuery);

var h = Math.max(window.frameElement.clientHeight, window.innerHeight || 0);
$("body").css("height", h - 30)