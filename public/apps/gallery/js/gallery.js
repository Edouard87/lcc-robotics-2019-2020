var ch = parseInt(window.frameElement.style.height, 10);

$.ajax({
    url: "/../../templates/horizontal-card.mustache",
    method: "get",
    success: function(template) {
        for (var i = 0; i < galleries.length; i++) {
            $("body").append(Mustache.to_html(template, {
                img: galleries[i].img,
                label: galleries[i]["label_" + lang],
                galleryid: i
            }));
            $('.card-wrapper').eq(i).css({
              'width': ch + "px"
            });
            $('.card-wrapper').eq(i).css({
              'height': (ch-2) + "px"
            });
            $('.card-wrapper').eq(i).css({
            'left': (i*ch) + "px"
            });
           $(".card-wrapper").off();
           $(".card-wrapper").on("click", function () {
             $('.card-wrapper').css({
               'border': "1px solid black"
             });
             $('.card-wrapper').css({
               'height': (ch - 2) + "px"
             });
             $('.card-wrapper').css({
               'z-index': "1"
             });
             $(this).css({
               'border': "2px solid black"
             });
             $(this).css({
               'height': (ch - 4) + "px"
             });
             $(this).css({
               'z-index': "2"
             });
           });
           var window_name
           $(".card-wrapper").on("dblclick", function () {
            parent.createWindow({
                page_index: "/apps/gallery/gallery.html",
                window_name: $(this).attr("label"),
                width: 500,
                height: 600,
                meta_1: $(this).attr("galleryid"),
                meta_2: $(this).attr("label")
             })
           });
        }
    }
});

