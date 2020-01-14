$("#logout-button").on("click", function () {
    parent.$("body").trigger("logout", [{
      wid: frameElement.getAttribute("wid")
    }])
})