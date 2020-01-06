function createWindow(meta) {

    meta.top = meta.top || "30";
    meta.left = meta.left || "30";
    if (meta.desktop_window == false) {
        meta.desktop_window = "";
    } else {
        meta.desktop_window = "persistent"
    }
    
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
      meta.content_height = meta.height - 17;
      $(".desktop").append(Mustache.to_html(windowTemplate, meta));
      dragElement(document.querySelector("[wid='" + wid + "']"));
      updateCloseButton();
      saveWindows();
      recalculateMenuBar();
      $("[wid='" + wid + "']").css("z-index", 51)
      $("[wid='" + wid + "']").on("mousedown", function () {
        $(".window").css("z-index", 10);
        $(this).css("z-index", 50);
      });
      $(".persistent[wid='" + wid + "']").on("mouseup", function() {
          saveWindows();
      })

    }

  });

}

function updateCloseButton() {

  $(".close").on("click", function () {

    $("[wid='" + $(this).attr("delTarget") + "']").remove();

  });

  $(".persistent .close").on("click", function () {

    saveWindows();

  });

};

//Make the DIV element draggagle:

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    $(".iframe-cover").css("display","block")
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // document.querySelector("iframe").contentDocument.onmouseup = closeDragElement
    document.onmousemove = elementDrag;
    // document.querySelector("iframe").contentDocument.onmousemove = elementDrag
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
    } else {
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

  }

  function closeDragElement() {
      $(".iframe-cover").css("display", "none")
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;

    recalculateMenuBar();
  }
}

function clearSession() {
  console.log("clearing...")
    $(".window").each(function() {
        $(this).remove();
    });
    saveWindows();
    location.reload();
};