var lang = parent.getCookie("lang","en")
console.log(lang)

$(".settings-option[lang='" + lang + "']").trigger("click");

$(".settings-option").on("click", function() {
    $(".button-right-wrapper").attr("lang",$(this).attr("lang"));
})

$("#change-lang").on("click", function () {
    Cookies.set("lang", $(this).attr("lang"));
    parent.createWindow({
      page_index: "/apps/lang/success.html",
      window_name: "Restart Required",
      width: 270,
      height: 140
    })
});

$("#reload-button").on("click", function() {
    parent.location.reload();
});