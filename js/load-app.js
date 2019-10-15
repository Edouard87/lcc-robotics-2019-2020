console.log('found-script...')

$("#get-app").on('click', function() {

  console.log('loading...')

  $.ajax({
      url: "/app/" + $("#app-name").val(),
      dataType: "html",
      success: function (data) {
          $(".window-content").html(data);
      }
  });

});
