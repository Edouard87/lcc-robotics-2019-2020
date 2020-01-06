var apps = [
    {
        app_name_en: "Texts",
        app_name_fr: "Publications",
        app: "fileExplorer",
        img: "/imgs/hard-disk-icon.png",
        meta_1: "texts",
        window_height: 350,
        window_width: 600,
        description_en: "Browse the texts written by the robotics team",
        description_fr: "Parcourer les textes écrits par les membres de l&#39équipe"
    }
]

for (var i = 0; i < apps.length; i++) {
    apps[i].name = apps[i]["app_name_" + lang]
    apps[i].description = apps[i]["description_" + lang]
    $(".settings-selector-options").append(`<h1 class='settings-option' app_name_en=${apps[i].app_name_en} app_name_fr=${apps[i].app_name_fr} window_width="${apps[i].window_width}" window_height="${apps[i].window_height}" meta_1="${apps[i].meta_1}" img="${apps[i].img}" app='${apps[i].app}' description ='${apps[i].description}'>${apps[i].name}</h1>`)
}

applyEventListeners()

var defaultBackground = $(".settings-option").css("background")
var defaultBorder = $(".settings-option").css("border")

$(".settings-option").on('click', function() {

    $(".settings-option").removeClass("selected")
    $(".settings-option").addClass("selected")

    $(".header-block h1").html($(this).html())
    $(".description-items p").html($(this).attr("description"))

    $(".description-items img").attr("src",$(this).attr("img"))
    $(".button-right-wrapper").css("opacity", "1");

});



$(".button-right-wrapper").on("click", function() {

    parent.createIcon({
        app: $(".selected").attr("app"),
        app_name_en: $(".selected").attr("app_name_en"),
        app_name_fr: $(".selected").attr("app_name_fr"),
        top: parent.getRandomVert(),
        left: parent.getRandomHoriz(),
        image: $(".selected").attr("img"),
        meta_1: $(".selected").attr("meta_1"),
        window_height: $(".selected").attr("window_height"),
        window_width: $(".selected").attr("window_width")
    })
})