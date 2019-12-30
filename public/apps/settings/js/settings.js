var settings = [
    {
        label: "Language",
        name: "lang",
        description: "Change the system language. Supported languages are French and English"
    },
    {
        label: "Language",
        name: "lang",
        description: "Change the system language. Supported languages are French and English"
    }
]

for (var i = 0; i < settings.length; i++) {

    $(".settings-selector-options").append("<h1 class='settings-option' name='" + settings[i].name + "' description ='" + settings[i].description + "'>" + settings[i].label + "</h1>")

}

var defaultBackground = $(".settings-option").css("background")
var defaultBorder = $(".settings-option").css("border")

$(".settings-option").on('click', function() {

    $(".header-block h1").html($(this).html())
    $(".description-items p").html($(this).attr("description"))

    $(".button-right-wrapper").attr("name",$(this).attr("name"))
    $(".button-right-wrapper").attr("label", $(this).html())

    $(".description-items img").attr("src","imgs/" + $(this).attr("name") + ".png")
    $(".button-right-wrapper").css("opacity", "1");

});

$(".button-right-wrapper").on("click", function() {
    
    parent.createWindow({
        page_index: "/apps/" + $(this).attr("name") + "/index.html",
        window_name: $(this).attr("label"),
        width: 290.469,
        height: 410

        
    })
    
    console.log($(this).attr("name"))
})