function getCookie(cookieName, def) {
    var cookie = Cookies.get(cookieName);
    console.log(cookie)
    console.log(cookie == "undefined")
    console.log("fetching...");
    if (cookie == "undefined" || cookie == undefined) {
        Cookies.set(cookieName, def);
        return def
    } else {
        return cookie
    }                                                                                            
}

var lang = getCookie("lang", "en");
console.log(lang)