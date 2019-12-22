// All relevant Mustache templates must be loaded in

$.ajax({
  url: "/templates/window.mustache",
  method: "get",
  success: function (windowTemplate) {

    $.ajax({
        url: "/templates/desktop-icon.mustache",
        method: "get",
        success: function(desktopIconTemplate) {

            icons = [{
              app: "testapp",
              app_name: "Hello",
              top: "10px",
              left: "10px",
              image: "/imgs/hard-disk-icon.png"
            }]

            for (var i = 0; i < icons.length; i++) {

                icons[i].iid = i;

                $(".desktop").append(Mustache.to_html(desktopIconTemplate,icons[i]));
                dragElement(document.getElementById("icon-" + i));
                $("#icon-" + i).on("dblclick", function() {

                    wids = []
                    for (var a = 0; a < $(".window").length; a++) {
                        wids.push($(".window")[a].getAttribute("wid"));
                    }
                    wid = parseInt(wids.sort()[wids.length - 1]) + 1
                    $(".desktop").append(Mustache.to_html(windowTemplate, {
                      wid: wid,
                      app: $(this).attr("app"),
                      app_name: $(this).attr("app_name")
                    }));
                    dragElement(document.querySelector("[wid='" + wid + "']"));
                    updateCloseButton();

                });

            }

        }
    })

  }
})

function updateCloseButton() {

    $(".close").on("click", function() {

        $("[wid='" + $(this).attr("delTarget") + "']").remove();

    });

};

//Make the DIV element draggagle:
dragElement(document.getElementById("window"));

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
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
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
        // if (pos3 < 684) { pos3 = e.clientX;}
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

    }

    function closeDragElement() {
        /* stop moving when mouse button is released:*/
        document.onmouseup = null;
        document.onmousemove = null;
    }
}
