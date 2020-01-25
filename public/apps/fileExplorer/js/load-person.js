$(".sample img").attr("src", window.frameElement.getAttribute("meta_4"));
$(".sample img").on("error", function() {

    $(this).parent().css("display","none")

});

if (window.frameElement.getAttribute("meta_2") == "") {
    $("#person-desc").parent().css("display","none")
} else {
    $("#person-desc").html(window.frameElement.getAttribute("meta_2"));
}

$("#name").html(window.frameElement.getAttribute("meta_1"))

$("#contributions").html(window.frameElement.getAttribute("meta_3"))