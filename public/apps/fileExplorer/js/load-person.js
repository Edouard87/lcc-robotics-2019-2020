$("students").each(function() {
  $(this).css("display","none");
})
$("texts").each(function () {
  $(this).css("display", "none");
})

$(window.frameElement.getAttribute("meta_4")).css("display","block");

if (window.frameElement.getAttribute("meta_4") == "texts") {
  $("#contributions-wrapper").css("display", "none")
}

$(".sample img").attr("src", "/apps/fileExplorer/img/" + window.frameElement.getAttribute("meta_1"));
$(".sample img").on("error", function() {

    $(this).parent().css("display","none")

});

$("#name").html(window.frameElement.getAttribute("meta_1"))

$("#person-desc").html(window.frameElement.getAttribute("meta_2"));

$("#contributions").html(window.frameElement.getAttribute("meta_3"))