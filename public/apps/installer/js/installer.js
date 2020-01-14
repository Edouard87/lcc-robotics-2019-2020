var apps = [
    {
        app_name_en: "Texts",
        app_name_fr: "Publications",
        app: "fileExplorer",
        img: "/imgs/appIcons/textsIcon.png",
        meta_1: "texts",
        window_height: 350,
        window_width: 600,
        description_en: "Browse the texts written by the robotics team",
        description_fr: "Parcourer les textes écrits par les membres de l&#39équipe"
    },
    {
        app_name_en: "List of Participating Students",
        app_name_fr: "Liste des étudiants participants",
        app: "fileExplorer",
        img: "/imgs/appIcons/peopleIcon.png",
        meta_1: "students",
        window_height: 350,
        window_width: 600,
        description_en: "Browse a list of the students involved in the robotics team, organised by contribution.",
        description_fr: "Parcourer une liste des membres de l&#39équipe de robotique d'LCC. Cette dernière est organisée par contribution."
    },
    {
      app_name_en: "Gallery",
      app_name_fr: "Gallerie",
      app: "gallery",
      img: "/imgs/appIcons/galleryIcon.png",
      window_height: 110,
      window_width: 500,
      description_en: "Browse a gallery full of images of the robotics team",
      description_fr: "Une collection d&#146;images de l&#146;équipe de robotique en train de travailler"
    }
]

for (var i = 0; i < apps.length; i++) {
    apps[i].name = apps[i]["app_name_" + lang]
    apps[i].description = apps[i]["description_" + lang]
    $(".settings-selector-options").append(`<h1 class='settings-option' app_name_en="${apps[i].app_name_en}" app_name_fr="${apps[i].app_name_fr}" window_width="${apps[i].window_width}" window_height="${apps[i].window_height}" meta_1="${apps[i].meta_1}" img="${apps[i].img}" app='${apps[i].app}' description ='${apps[i].description}'>${apps[i].name}</h1>`)
}

applyEventListeners()

var defaultBackground = $(".settings-option").css("background")
var defaultBorder = $(".settings-option").css("border")

$(".settings-option").on('click', function() {

    $(".settings-option").removeClass("selected")
    $(this).addClass("selected")

    $(".header-block h1").html($(this).html())
    $(".description-items p").html($(this).attr("description"))

    $(".description-items img").attr("src",$(this).attr("img"))
    $(".button-right-wrapper").css("opacity", "1");

});

$(".button-right-wrapper").on("click", function() {
    var window_name;
    var amountWindows = parent.$(".desktop-icon").length;
    if (amountWindows <= 9) {
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
        if (lang == "en") {
          window_name = "Success"
        } else {
          window_name = "Succès"
        }
        parent.createWindow({
          page_index: "apps/installer/status.html",
          window_name: window_name,
          width: 400,
          height: 210,
          top: 0,
          left: 0,
          app: status,
          meta_1: "The app was successfully installed and can be found on the desktop.",
          meta_2: "Français"
        })
    } else {
        if (lang == "en") {
          window_name = "Error"
        } else {
          window_name = "Échec"
        }
        parent.createWindow({
          page_index: "apps/installer/status.html",
          window_name: window_name,
          width: 400,
          height: 210,
          top: 0,
          left: 0,
          app: status,
          meta_1: "No more memory. Plese use the App Uninstaller under Tools to delete apps.",
          meta_2: "Français"
        })
    }
})