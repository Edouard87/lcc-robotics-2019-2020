$("#close-menu").on("click", function() {
    parent.$(".window[app='" + window.frameElement.getAttribute("meta_1") + "']").remove();
})