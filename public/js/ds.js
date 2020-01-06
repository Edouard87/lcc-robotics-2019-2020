$(document).on("click", function() {

    if ($(event.target).attr("class") != "icon-image") {

        $(".desktop-icon h1").css("background", "white")
        $(".desktop-icon h1").css("color", "black")

    }

    if (!$(event.target).hasClass("menu-text")) {
        $(".dropdown-menu").css("display", "none");
        $(".menu-button").css("background", "transparent");
        $(".menu-button").css("color", "black");
    }

})

function loadIcons(icons) {

    try {

        for (var i = 0; i < icons.length; i++) {

          createIcon(icons[i]);

        }

    } catch(err) {

        console.log("err!")

    }

    

}

function createIcon(meta) {

    $.ajax({
      url: "/templates/desktop-icon.mustache",
      method: "get",
      success: function (desktopIconTemplate) {

        var iids = []
        var iid;
        for (var a = 0; a < $(".desktop-icon").length; a++) {
          iids.push($(".desktop-icon")[a].getAttribute("iid"));
        }
        if (iids.length == 0) {
          iid = 0;
        } else {
          iid = parseInt(iids.sort()[iids.length - 1], 10) + 1;
        }

        meta.iid = iid;

        meta.app_name = meta["app_name_" + lang]

        $(".desktop").append(Mustache.to_html(desktopIconTemplate, meta));
        dragElement(document.getElementById("icon-" + iid));

        $("#icon-" + iid).on("mousedown", function () {

          $(".desktop-icon h1").css("background", "white")
          $(".desktop-icon h1").css("color", "black")

          $(this).find("h1").css("background", "rgb(1,3,0)");
          $(this).find("h1").css("color", "white");

        });

        $("#icon-" + iid).on("dblclick", function () {

          createWindow({
            page_index: "/apps/" + $(this).attr("app") + "/index.html",
            window_name: $(this).attr("app_name"),
            width: $(this).attr("window_width"),
            height: $(this).attr("window_height"),
            meta_1: $(this).attr("meta_1"),
            app: $(this).attr("app")
          });

        });

        console.log("attaching...")

        $("#icon-" + iid).on("mouseup", function () {

          saveIcons()
          console.log("saving...")

        });
        
        saveIcons();

      }
    })
}

$.ajax({
    url: "/getdata",
    method: "get",
    success: function(userdata) {
        console.log(userdata);
        loadIcons(userdata.icons)
        loadWindows(userdata.windows);
        console.log(userdata.background.image)
        $("body").css("background-image", "url('" + userdata.background.image + "')")
        $("body").attr("background-image", userdata.background.image)
    }
});

function loadWindows(windows) {
    try {
        for (var i = 0; i < windows.length; i++) {
          createWindow(windows[i]);
        }
    } catch(err) {
        console.log("err!")
    }
    console.log("calc...")
}

function saveIcons() {
    var icons = [];
    var attributes;
    $(".desktop-icon").each(function() {
        icons.push({
          app: $(this).attr("app"),
          app_name_en: $(this).attr("app_name_en"),
          app_name_fr: $(this).attr("app_name_en"),
          top: $(this).css("top"),
          left: $(this).css("left"),
          image: $(this).attr("image"),
          meta_1: $(this).attr("meta_1"),
          window_height: $(this).attr("window_height"),
          window_width: $(this).attr("window_width")
        });
    })
    $.ajax({
        url: "/save/icons",
        method: "post",
        contentType: 'application/json',
        data: JSON.stringify(icons),
        dataType: 'json'
    })
}

function saveWindows() {
    var windows = []
    $(".window").each(function() {
        windows.push({
            page_index: $(this).attr("page_index"),
            window_name: $(this).attr("window_name"),
            top: $(this).css("top").split("px").shift(),
            left: $(this).css("left").split("px").shift(),
            width: $(this).css("width").split("px").shift(),
            height: $(this).css("height").split("px").shift(),
            meta_1: $(this).attr("meta_1"),
            meta_2: $(this).attr("meta_2"),
            meta_3: $(this).attr("meta_3"),
            meta_4: $(this).attr("meta_4")
        })
    });
    $.ajax({
      url: "/save/windows",
      method: "post",
      contentType: 'application/json',
      data: JSON.stringify(windows),
      dataType: 'json'
    })
    console.log(windows);
}

function updateIconSpawnArea() {

    $(".app-spawn-area").remove();
    $(".desktop").append(`<div class="app-spawn-area" style="z-index: 1; top: 30px; left: 0; position: absolute; width: ${window.innerWidth-200}px; height: ${window.innerHeight-200}px"></div>`)

}
updateIconSpawnArea()

// make sure no apps ever go offscreen

function updateIconPos() {
    $(".desktop-icon").each(function () {
      if ((parseInt($(this).css("left"),10) + parseInt($(this).css("width"),10)) >= window.innerWidth) {
        console.log("BAD!") 
        console.log(getRandomVert())
        $(this).css("left", getRandomHoriz())
      }
      if ((parseInt($(this).css("top"), 10) + parseInt($(this).css("height"), 10)) >= window.innerHeight) {
        console.log("BAD!")
        $(this).css("top", getRandomVert())
      }
    });
}

window.addEventListener('resize', function() {
    updateIconSpawnArea();
    updateIconPos();
    saveIcons();
});