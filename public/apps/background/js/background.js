var settings = [
    {
        label_en: "MacOs Pattern",
        label_fr: "Langue du Système",
        image: "/imgs/backgrounds/macos.png"
    },
    {
      label_en: "Blue",
      label_fr: "Langue du Système",
      image: "/imgs/backgrounds/blue.png"
    }
]

for (var i = 0; i < settings.length; i++) {
    settings[i].label = settings[i]["label_" + lang]
    $(".settings-selector-options").append("<h1 class='settings-option' image='" + settings[i].image + "''>" + settings[i].label + "</h1>")
}

applyEventListeners()

var selectedBackground = parent.$("body").attr("background-image")

console.log(selectedBackground)

$(".settings-option[image='" + selectedBackground + "']").trigger("click");

$(".settings-option").on('click', function() {

    $(".settings-option").removeClass("selected")
    $(this).addClass("selected")
    $(".button-right-wrapper").css("opacity",1);
    $(".desktop-sample").attr("src", $(this).attr("image"))

});

$(".button-right-wrapper").on("click", function() {

    $.ajax({
        url: "/save/background",
        method: "post",
        data: {image: $(".selected").attr("image")}
    });
    parent.$("body").css("background-image", "url('" + $(".selected").attr("image") + "')")
    
})