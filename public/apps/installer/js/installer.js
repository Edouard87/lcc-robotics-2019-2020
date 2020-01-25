var apps = [
    {
        app_name_en: "Texts",
        app_name_fr: "Publications",
        app: "fileExplorer",
        img: "/imgs/appIcons/textsIcon.png",
        meta_1: "texts",
        window_height: 350,
        window_width: 600,
        description_en: "Browse the texts written by the robotics team.",
        description_fr: "Parcourir les textes écrits par les membres de l&#39équipe."
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
        description_fr: "Parcourer une liste des membres de l&#39équipe de robotique d&#39LCC. Cette dernière est organisée par contribution."
    },
    {
      app_name_en: "Gallery",
      app_name_fr: "Gallerie",
      app: "gallery",
      img: "/imgs/appIcons/galleryIcon.png",
      window_height: 110,
      window_width: 500,
      description_en: "Browse a gallery full of images of the robotics team as they perform various tasks.",
      description_fr: "Une collection d&#39images de l&#39équipe de robotique en train de travailler."
    },
    {
      app_name_en: "CRC Competition Description",
      app_name_fr: "Description de la compétition",
      app: "comp",
      img: "/imgs/appIcons/crc.png",
      window_height: 350,
      window_width: 600,
      description_en: "An explanation of the components of the competition and of the its goal. This app also displays the time, place and name of this year&#146s competition.",
      description_fr: "Une collection d&#146images de l&#146équipe de robotique en train de travailler."
    },
    {
      app_name_en: "Game Description",
      app_name_fr: "Description du jeux",
      app: "game",
      img: "/imgs/appIcons/flip.png",
      window_height: 350,
      window_width: 600,
      description_en: "An explanation of the rules of the game of this year&#146s competition.",
      description_fr: "Une explication des règles de la compétition de l&#146année 2020."
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
          meta_2: "L&#39;application a été installée avec succès et peut être retrouvée sur le bureau."
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
          meta_2: "Vous n&#39;avez plus d&#39;espace mémoire. Veuillez désinstaller des applications à l&#39;aide du menu Outils."
        })
    }
})