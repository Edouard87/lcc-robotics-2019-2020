$.ajax({
    url: "/templates/file-explorer-item.mustache",
    method: "get",
    error: function() {
        console.log("error!")
    },
    success: function(template) {

        $.ajax({
          url: "/dirlookup/" + window.frameElement.getAttribute("meta_1") + "/0/1",
          method: "get",
          success: function (maindir) {

            console.log(maindir)

            for (var i = 0; i < maindir.length; i++) {

                $(".file-selector #col-1").append(Mustache.to_html(template, {
                    label: maindir[i],
                    item_id: i, 
                    item_col: 1,
                    col_num: 1,
                    item_num: i,
                    arrow_display: "block",
                    total_items: maindir.length
                }));
                $("#item-1-" + i).on("click", function() {
                    
                    onHoverEffect($(this),1);
                    setJob = $(this).attr("label");
                    $.ajax({
                        url: "/dirlookup/" + window.frameElement.getAttribute("meta_1") + "/" + $(this).attr("col_num") + "/" + $(this).attr("item_num"),
                        method: "get",
                        success: function(subdir) {
                            
                            $(".file-selector #col-2").empty();
                            
                            for (var a = 0; a < subdir.length; a++) {

                                $(".file-selector #col-2").append(Mustache.to_html(template, {
                                  label: subdir[a],
                                  item_id: a,
                                  item_col: 2,
                                  col_num: 2,
                                  item_num: a,
                                  arrow_display: "none",
                                  total_items: subdir.length
                                }));

                                $("#item-2-" + a).on("click", function() {
                                    
                                    onHoverEffect($(this),2)

                                });

                                $("#item-2-" + a).on("dblclick", function () {

                                    console.log("checking for person...");
                                    parent.createWindow({
                                      page_index: "/apps/fileExplorer/sample.html",
                                      window_name: $(this).attr("label"),
                                      width: 500,
                                      height: 300,
                                      meta_1: window.frameElement.getAttribute("meta_1"),
                                      meta_2: $(this).attr("item_num"),
                                      meta_3: $(this).attr("label")
                                    });

                                })

                            }

                        }
                    })

                });

            }

          }
        })

    }
})

function onHoverEffect(elm,colNum) {

    $(".top-map #col-" + colNum + " img").attr("src","/apps/students/img/" + elm.attr("label") + ".png");
    $(".top-map #col-" + colNum + " img").on("error", function() {
        
        console.log(colNum);

        if (colNum == 2) {

            $(this).attr("src", "/apps/fileExplorer/img/file-icon.png");

        } else {

            $(this).attr("src", "/apps/fileExplorer/img/dir-icon.png");

        }


    });
    $(".top-map #col-" + colNum + " h1").html(elm.attr("label"))
    $(".file-selector #col-" + (colNum+1)).empty();
    $("#col-" + colNum + " " + ".selector-col-item").css("background", "white");
    elm.css("background", "rgb(187,187,225)");
    $(".top-map #col-" + colNum).css("display", "block");
    $(".top-map #sized-" + colNum).css("display", "block");

    $(".top-map #col-" + (colNum+1)).css("display", "none");
    $(".top-map #sized-" + (colNum+1)).css("display", "none");
    $("#items").html(elm.attr("total_items"));
    
}