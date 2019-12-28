$(".sample img").attr("src", "/apps/fileExplorer/img/" + window.frameElement.getAttribute("meta_2"));
$(".sample img").on("error", function() {

    console.log("no image")
    $(this).attr("src","/apps/fileExplorer/img/error-image.png")

});

$.ajax({
  url: "/textlookup/" + window.frameElement.getAttribute("meta_1") + "/" + window.frameElement.getAttribute("meta_2") + "/" + window.frameElement.getAttribute("meta_3"),
  method: "get",
  success: function(info) {
    console.log("got person")
      $("#person-desc").html(info)
  }
})