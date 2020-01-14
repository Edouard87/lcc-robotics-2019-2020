$(".sample img").attr("src", window.frameElement.getAttribute("meta_4"));
$(".sample img").on("error", function() {

    $(this).parent().css("display","none")

});

console.log(window.frameElement.getAttribute("meta_1").split(" ")[0])

$("#name").html(window.frameElement.getAttribute("meta_1"))

$("#person-desc").html(window.frameElement.getAttribute("meta_2"));

$("#contributions").html(window.frameElement.getAttribute("meta_3"))