$(document).ready(function() {

  console.log("script ready!")

  $("a").on("click", function(e) {

    e.preventDefault();
    console.log("Link pressed!");
    console.log($(this).attr("href"))

    $(".main-website").attr("src",$(this).attr("href"));

    // $.ajax()

  })

})
