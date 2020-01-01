console.log(lang)

var menuItems = [
    {
        label_fr: "home",
        label_en: "acceuil",
        submenus: [
            {
                label: "About this School",
                app: "aboutSchool",
                window_height: 280,
                window_width: 430
            }
        ]
    },
    {
      label_en: "Tools",
      label_fr: "Outils",
      submenus: [{
        label_en: "Settings",
        label_fr: "Parmantères",
        app: "settings",
        window_height: 450,
        window_width: 570
      }
    ]
    },
    {
      label_en: "Help",
      label_fr: "Aide",
      submenus: [{
        label_en: "What is this?",
        label_fr: "Quest-ce que c'est?",
        app: "info",
        window_height: 280,
        window_width: 430
      }]
    }
]

console.log(menuItems)

for (var i = 0; i < menuItems.length; i++) {

  menuItems[i].label = menuItems[i]["label_" + lang];

    if (i==0) {
        // console.log($("#menu-bar-img-template").html())
        $(".menu-bar").append(`<div menu="${i}" id="menu-item-${i}" class="menu-bar-img menu-button"><img class="menu-text" src = "/imgs/apple-logo.png"></div>`)
    } else {

        $(".menu-bar").append(`<div menu="${i}" id="menu-item-${i}" class="menu-bar-item menu-button"><p class="menu-text">${menuItems[i].label}</p></div>`)

    }
    
    $(".menu-bar").append(`<div origin_button="${i}" style="display: none" id="dropdown-menu-${i}" class="dropdown-menu"></div>`)

    $("#menu-item-" + i).on("click", function() {

        $(".menu-button").css("background", "transparent")
        $(".menu-button").css("color", "black")


        $(".dropdown-menu").css("display","none")
       $("#dropdown-menu-" + $(this).attr("menu")).css("display","block")
       $(this).css("background","rgb(8, 11, 81)");
       $(this).css("color","white");

    });

    for (var a = 0; a < menuItems[i].submenus.length; a++) {

        menuItems[i].submenus[a].label = menuItems[i].submenus[a]["label_" + lang];
        $("#dropdown-menu-" + i).append(`<div window_width="${menuItems[i].submenus[a].window_width}" window_height="${menuItems[i].submenus[a].window_height}" app="${menuItems[i].submenus[a].app}" app_name="${menuItems[i].submenus[a].label}" origin_menu="${i}" origin="menu-item-${i}" id="submenu-item-${i}-${a}" app="${menuItems[i].submenus[a].app}" class="dropdown-menu-item"><p>${menuItems[i].submenus[a].label}</p></div>`)

    }

}

$(".dropdown-menu-item").on('click', function () {

  $("#dropdown-menu-" + $(this).attr("origin_menu")).css("display", "none");
  createWindow({
    page_index: "/apps/" + $(this).attr("app") + "/index.html",
    window_name: $(this).attr("app_name"),
    width: $(this).attr("window_width"),
    height: $(this).attr("window_height")
  })

});

$(".menu-button").on("click", function () {

    $(".dropdown-menu").css("left", $(this).offset().left)

})