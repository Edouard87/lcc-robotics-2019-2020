var window_name;
if (lang = "fr") {
  window_name = "Échec"
} else {
  window_name = "Error"
}

$("#login-button").on("click", function(){
    $.ajax({
        type: "post",
        url: "/login",
        data: $("#user-form").serialize(),
        success: function(status) {
            if (status == "logged_in") {
              location.href = "/desktop"
            } else {
                parent.createWindow({
                  page_index: "/welcome_status_messages/" + status + ".html",
                  width: 400,
                  height: 210,
                  window_name: window_name,
                  top: 0,
                  left: 0,
                  app: status,
                  meta_1: status
                })
            }
            if (status == "bad") {

            }

        }
    });
});

$("#register-button").on("click", function() {
    console.log("registering...")
    $.ajax({
      type: "post",
      url: "/register",
      data: $("#user-form").serialize(),
      success: function (status) {
        console.log(status);
        if (status == "user_created") {
          $("#login-button").trigger("click");
        } else {
            parent.createWindow({
              page_index: "/welcome_status_messages/" + status + ".html",
              window_name: window_name,
              width: 400,
              height: 210,
              top: 0,
              left: 0,
              app: status,
              meta_1: status
            })
        }
      }
    });
});