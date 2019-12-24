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
                }))
                $("#item-1-" + i).on("click", function() {

                    onHoverEffect($(this),1)
                    
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

    $(".top-map #col-" + colNum + " " + " h1").html(elm.attr("label"))
    $(".file-selector #col-" + colNum+1).empty();
    $("#col-" + colNum + " " + ".selector-col-item").css("background", "white");
    elm.css("background", "rgb(187,187,225)");
    $(".top-map #col-" + colNum).css("display", "block");
    $(".top-map #sized-" + colNum).css("display", "block")
    
}