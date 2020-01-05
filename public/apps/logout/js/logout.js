$("#logout-button").on("click", function () {
    Cookies.remove("auth");
    parent.location.href="/";
})