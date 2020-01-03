// console.log(texts)
// console.log(students);

// console.log)

var lang = parent.lang;

$.ajax({
    url: "/templates/file-explorer-item.mustache",
    method: "get",
    error: function() {
        console.log("error!")
    },
    success: function(template) {

        var request = window.frameElement.getAttribute("meta_1");
        var data = eval(request);
        console.log(data)
        var roles = [];

        if (request == "students") {

            for (var i = 0; i < data.length; i++) {
                for (var a = 0; a < data[i]["roles_" + lang].length; a++) {
                    if (!roles.includes(data[i]["roles_" + lang][a])) {
                      roles.push(data[i]["roles_" + lang][a])
                    }
                }
            }
            for (var i = 0; i < roles.length; i++) {
                $(".file-selector #col-1").append(Mustache.to_html(template, {
                  label: roles[i],
                  item_id: i,
                  item_col: 1,
                  col_num: 1,
                  item_num: i,
                  arrow_display: "block",
                  total_items: roles.length,
                  type: "0"
                }));
            }
        $(".selector-col-item").on("click", function () {
            $(".selector-col#col-2").empty();
          if ($(this).attr("col_num") == "1") {
            var results = [];
            for (var i = 0; i < data.length; i++) {
                for (var a = 0; a < data[i]["roles_" + lang].length; a++) {
                    if (data[i]["roles_" + lang][a] == $(this).attr("label")) {
                      results.push(data[i]);
                    }
                }
            }
            // $(".file-selector #col-2").empty()
            console.log("loading...")
            console.log(results);
            onHoverEffect($(this));
            for (var i = 0; i < results.length; i++) {
                console.log("appending...")
                var contributions = "";
                for (var e = 0; e < results[i]["roles_" + lang].length; e++) {
                    if (e == 0) {
                        contributions = results[i]["roles_" + lang][e]
                    } else {
                        contributions = contributions + ", " + results[i]["roles_" + lang][e]
                    }
                }
                $(".file-selector #col-2").append(Mustache.to_html(template, {
                  label: results[i].name,
                  item_id: i,
                  item_col: 2,
                  col_num: 2,
                  item_num: i,
                  arrow_display: "none",
                  total_items: results.length,
                  type: "1",
                  content: results[i]["description_" + lang],
                  contributions: contributions
                }));
            }
            $(".selector-col-item").on('dblclick', function() {
                if ($(this).attr("type") == "1") {
                    var contributions = [];
                    for (var i = 0; i < data.length; i++) {
                        if (data[i].name == $(this).attr("label")) {
                            contributions.push(data[i]["role_" + lang]);
                        }
                    }
                    console.log(contributions)
                    parent.createWindow({
                        page_index: "/apps/fileExplorer/sample.html",
                        window_name: $(this).attr("label"),
                        width: 500,
                        height: 300,
                        meta_1: $(this).attr("label"),
                        meta_2: $(this).attr("content"),
                        meta_3: $(this).attr("contributions"),
                        meta_4: "students"
                    });
                }
            })
            $(".selector-col-item").on("click", function () {
                onHoverEffect($(this));
            })
          }
        });

        } else if (request == "texts") {
            for (var i = 0; i < data.length; i++) {
                data[i].label = data[i]["label_" + lang];
                $(".file-selector #col-1").append(Mustache.to_html(template, {
                  label: data[i].label,
                  item_id: i,
                  item_col: 1,
                  col_num: 1,
                  item_num: i,
                  arrow_display: "block",
                  total_items: data.length,
                  type: "0"
                }));
            }
            var results = [];
            $(".selector-col-item").on("click", function() {
                onHoverEffect($(this));
                $(".selector-col#col-2").empty();
                for (var i = 0; i < data.length; i++) {
                  if (data[i]["label_" + lang] == $(this).attr("label")) {
                    for (var a = 0; a < data[i].pubs.length; a++) {
                        $(".file-selector #col-2").append(Mustache.to_html(template, {
                          label: data[i].pubs[a]["label_" + lang],
                          item_id: a,
                          item_col: 2,
                          col_num: 2,
                          item_num: a,
                          arrow_display: "none",
                          total_items: data[i].pubs.length,
                          type: "1",
                          content: data[i].pubs[a]["content_" + lang]
                        }));
                    }
                  }
                }
                console.log(results);
                $(".selector-col-item").on("click", function() {
                    onHoverEffect($(this));
                })
                $(".selector-col-item").on("dblclick", function () {
                  parent.createWindow({
                    page_index: "/apps/fileExplorer/sample.html",
                    window_name: $(this).attr("label"),
                    width: 500,
                    height: 300,
                    meta_1: $(this).attr("label"),
                    meta_2: $(this).attr("content"),
                    meta_3: $(this).attr("contributions"),
                    meta_4: "texts"
                  });
                })
            })
        } else {
            console.log("err!")
        }

    }
})

function onHoverEffect(elm) {
    var colNum = parseInt(elm.attr("col_num"),10);

    $(".top-map #col-" + colNum + " img").attr("src","/apps/students/img/" + elm.attr("label") + ".png");
    $(".top-map #col-" + colNum + " img").on("error", function() {

        if (colNum == 2) {

            $(this).attr("src", "/apps/fileExplorer/img/file-icon.png");

        } else {

            $(this).attr("src", "/apps/fileExplorer/img/dir-icon.png");

        }


    });
    $(".top-map #col-" + colNum + " h1").html(elm.attr("label"))
    $("#col-" + colNum + " " + ".selector-col-item").css("background", "white");
    elm.css("background", "rgb(187,187,225)");
    $(".top-map #col-" + colNum).css("display", "block");
    $(".top-map #sized-" + colNum).css("display", "block");

    $(".top-map #col-" + (colNum+1)).css("display", "none");
    $(".top-map #sized-" + (colNum+1)).css("display", "none");
    $(".items").html(elm.attr("total_items"));
    
}