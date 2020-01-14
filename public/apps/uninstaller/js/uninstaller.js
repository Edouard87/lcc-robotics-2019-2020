function getApps() {

    $(".settings-selector-options").empty();

    parent.$(".desktop-icon").each(function () {
        console.log(lang)
      $(".settings-selector-options").append(`<h1 meta_1="${$(this).attr("meta_1")}" app="${$(this).attr("app")}" iid="${$(this).attr("iid")}" class="settings-option">${$(this).attr("app_name_" + lang)}</h1>`)
    });

    applyEventListeners();

    $(".settings-option").on("click", function () {
      $(".settings-option").removeClass("selected")
      $(this).addClass("selected")
    });

}

getApps()

var selectedApp;

$("#uninstall-button").on("click", function() {
    selectedApp = $(".settings-option.selected")
    parent.$(".desktop-icon[iid='" + selectedApp.attr("iid") + "']").remove()
    getApps()
    parent.$(".window[app='" + selectedApp.attr("app") + "'][meta_1='" + selectedApp.attr("meta_1") + "']").remove();
    parent.saveWindows();
    parent.saveIcons();
})