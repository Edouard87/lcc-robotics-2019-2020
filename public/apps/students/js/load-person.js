$(".sample img").attr("src", "/apps/students/img/" + window.frameElement.getAttribute("meta_2"));
$(".sample img").on("error", function() {

    console.log("no image")
    $(this).attr("src","/apps/students/img/error-image.png")

});

$.ajax({
  url: "/description/" + window.frameElement.getAttribute("meta_1") + "/" + window.frameElement.getAttribute("meta_2"),
  method: "get",
  success: function(info) {
      $("#person-desc").html(info)
  }
})