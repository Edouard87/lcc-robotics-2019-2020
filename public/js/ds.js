$(document).on("click", function() {

    if ($(event.target).attr("class") != "icon-image") {

        $(".desktop-icon h1").css("background", "white")
        $(".desktop-icon h1").css("color", "black")

    }

})

$.ajax({
  url: "/templates/window.mustache",
  method: "get",
  success: function (windowTemplate) {

    $.ajax({
        url: "/templates/desktop-icon.mustache",
        method: "get",
        success: function(desktopIconTemplate) {

            icons = [{
              app: "fileExplorer",
              app_name: "List of Participating Students",
              top: "350px",
              left: "10px",
              image: "/imgs/hard-disk-icon.png",
              meta_1: "students",
              window_height: 350, 
              window_width: 600
            },
            {
                app: "fileExplorer",
                app_name: "List of Participating Students",
                top: "350px",
                left: "100px",
                image: "/imgs/hard-disk-icon.png",
                meta_1: "texts",
                window_height: 350,
                window_width: 600
            }]

            for (var i = 0; i < icons.length; i++) {

                icons[i].iid = i;

                $(".desktop").append(Mustache.to_html(desktopIconTemplate,icons[i]));
                dragElement(document.getElementById("icon-" + i));
                
                $("#icon-" + i).on("mousedown", function() {
                    
                    $(".desktop-icon h1").css("background","white")
                    $(".desktop-icon h1").css("color","black")

                    $(this).find("h1").css("background","rgb(1,3,0)");
                    $(this).find("h1").css("color", "white");

                });
                
                $("#icon-" + i).on("dblclick", function() {

                    createWindow({
                      page_index: "/apps/" + $(this).attr("app") + "/index.html",
                      window_name: $(this).attr("app_name"),
                      width: $(this).attr("window_width"),
                      height: $(this).attr("window_height"),
                      meta_1: $(this).attr("meta_1")
                    })

                });

            }

        }
    })

  }
});

function createWindow(meta) {

    $.ajax({
      url: "/templates/window.mustache",
      method: "get",
      success: function (windowTemplate) {

            var wids = []
            var wid;
            for (var a = 0; a < $(".window").length; a++) {
              wids.push($(".window")[a].getAttribute("wid"));
            }
            if (wids.length == 0) {
                wid = 0;
            } else {
                wid = parseInt(wids.sort()[wids.length - 1], 10) + 1;
            }
            meta.wid = wid;
            meta.content_height = meta.height-17;
            // console.log(meta)
            $(".desktop").append(Mustache.to_html(windowTemplate,meta));
            dragElement(document.querySelector("[wid='" + wid + "']"));
            updateCloseButton();
            console.log("[wid='" + wid + "']");
            $("[wid='" + wid + "']").css("z-index",51)
            $("[wid='" + wid + "']").on("mousedown", function() {
                $(".window").css("z-index",1);
                $(this).css("z-index",50);
            })

      }

    });

}

function updateCloseButton() {

    $(".close").on("click", function() {

        $("[wid='" + $(this).attr("delTarget") + "']").remove();

    });

};

//Make the DIV element draggagle:
// dragElement(document.getElementById("window"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
        console.log(elmnt.id + "header")
        /* if present, the header is where you move the DIV from:*/
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
        /* otherwise, move the DIV from anywhere inside the DIV:*/
        elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
        $(".window").css("z-index", "1");
        e = e || window.event;
        e.preventDefault();
        console.log(e)
        // e.style.zIndex = 99;
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        // console.log(pos4);
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        // set the element's new position amd apply restrictions
        if (elmnt.offsetTop <= 21) {
            elmnt.style.top = (elmnt.offsetTop + 1) + "px";
        } else if (elmnt.offsetLeft <= 0) {
            elmnt.style.left = (elmnt.offsetLeft + 1) + "px";
        } else if ((elmnt.offsetLeft + elmnt.offsetWidth) >= viewportWidth) {
            elmnt.style.left = (elmnt.offsetLeft - 1) + "px";
            // console.log()
        } else if ((elmnt.offsetTop + elmnt.offsetHeight) >= viewportHeight) {
            elmnt.style.top = (elmnt.offsetTop - 1) + "px";     
        } else {
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
        
    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
