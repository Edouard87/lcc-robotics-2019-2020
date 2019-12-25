$.ajax({
    url: "/templates/file-explorer-item.mustache",
    method: "get",
    success: function(template) {

        $.ajax({
          url: "/jobs/all/",
          method: "get",
          success: function (allJobs) {

            for (var i = 0; i < allJobs.length; i++) {

                $(".file-selector #col-1").append(Mustache.to_html(template, {
                    label: allJobs[i], 
                    item_id: i, 
                    item_col: 1,
                    arrow_display: "block"
                }));
                $("#item-1-" + i).on("click", function() {

                    onHoverEffect($(this),1);
                    setJob = $(this).attr("label");
                    $.ajax({
                        url: "/job/" + $(this).attr("label"),
                        method: "get",
                        success: function(people) {
                            
                            $(".file-selector #col-2").empty();
                            
                            for (var a = 0; a < people.length; a++) {

                                $(".file-selector #col-2").append(Mustache.to_html(template, {
                                  label: people[a],
                                  item_id: a,
                                  item_col: 2,
                                  arrow_display: "none"
                                }))

                                $("#item-2-" + a).on("click", function() {
                                    
                                    onHoverEffect($(this),2)

                                });

                                $("#item-2-" + a).on("dblclick", function () {

                                    console.log("checking for person...");
                                    parent.createWindow({
                                      page_index: "/apps/students/person.html",
                                      window_name: $(this).attr("label"),
                                      width: 500,
                                      height: 300,
                                      meta_1: setJob,
                                      meta_2: $(this).attr("label")
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

            $(this).attr("src", "/apps/students/img/file-icon.png");

        } else {

            $(this).attr("src", "/apps/students/img/dir-icon.png");

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
    
}