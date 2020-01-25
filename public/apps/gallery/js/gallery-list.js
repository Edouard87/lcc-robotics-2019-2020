var selectedGallery = galleries[parseInt(window.frameElement.getAttribute("meta_1"), 10)];

$("#gallery-name").html(window.frameElement.getAttribute("meta_2"))
$("#gallery-desc").html(selectedGallery["description_" + lang])

$.ajax({
    url: "/templates/gallery-entry.mustache",
    method: "get",
    success: function(template) {
        console.log(selectedGallery.images.length)
        console.log(template);
        for (var i = 0; i < selectedGallery.images.length; i++) {
            $(".gallery-container").append(Mustache.to_html(template, {
                label: selectedGallery.images[i]["label_" + lang],
                src: selectedGallery.images[i].img,
                description: selectedGallery.images[i]["description_" + lang],
                did: i
            }));
            console.log(selectedGallery.images[i]["description_" + lang] == "")
            console.log(selectedGallery.images[i]["description_" + lang])
            // if (selectedGallery.images[i]["description_" + lang] == "") {
            //     $("[did='" + i + "']").addClass("center-flex-align")
            // }
        }
    }
})

// console.log()