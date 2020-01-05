var settings = [
    {
        label_en: "Language",
        label_fr: "Langue du Système",
        name: "lang",
        description_en: "Change the system language. Supported languages are French and English",
        description_fr: "Changez la langue du système d&#39exploitation. Les langues supportés sont le Français et l&#39Anglais"
    }
]

for (var i = 0; i < settings.length; i++) {
    settings[i].label = settings[i]["label_" + lang]
    settings[i].description = settings[i]["description_" + lang]
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