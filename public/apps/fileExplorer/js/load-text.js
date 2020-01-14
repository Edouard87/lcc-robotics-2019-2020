(function ($) {
  $(window).on("load", function () {
    console.log("loading bar")
    $("body").mCustomScrollbar({
      theme: "3d-thick-dark"
    });
  });
})(jQuery);

var h = Math.max(window.frameElement.clientHeight, window.innerHeight || 0);
$("body").css("height",h-30)

$("img").attr("src", window.frameElement.getAttribute("meta_4"));
$("img").on("error", function() {

    $(this).css("display","none")

});

$("h1").html(window.frameElement.getAttribute("meta_1"))

$("p").html(window.frameElement.getAttribute("meta_2"));

// $("#contributions").html(window.frameElement.getAttribute("meta_3"))