// Only make French text visible

$("fr").each(function() {
    $(this).css("display","none")
})
$("en").each(function () {
  $(this).css("display", "none")
})
$("*").each(function(){
    if ($(this).prop("tagName").toLowerCase() == lang) {
        $(this).css("display","block");
    }
})
$(lang).each(function () {
  if ($(this).attr("display") != undefined && $(this).css("display") == "block") {
    $(this).css("display", $(this).attr("display"));
  }
})