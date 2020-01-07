
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require("fs")

const jwt = require("jsonwebtoken");

const app = express();
const store = require("data-store")("users", {
  cwd: 'users'
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));

function authenticate(req, res, next) {
  const token = req.cookies.auth
  if (token == undefined) {
    res.redirect("/")
  } else {
    try {
      const result = jwt.verify(token, 'shhhhh');
      req.decoded = result;
      next();
    } catch(err) {
      res.redirect("/")
    }
  }
}

app.get("/", function(req, res) {

  const token = req.cookies.auth
  if (token == undefined) {
    return res.render("welcome")
  } else {
    try {
      const result = jwt.verify(token, 'shhhhh');
      req.decoded = result;
      return res.redirect("/desktop");
    } catch (err) {
      return res.render("welcome")
    }
  }

});

app.get("/getdata", authenticate, function(req, res) {
  res.send(store.get(req.decoded.user).userdata)
});

app.post("/save/:target", authenticate, function(req, res) {
  store.set(req.decoded.user + ".userdata." + req.params.target, req.body);
  if (req.params.target == "settings") {
    console.log(req.body)
  }
  res.end();
});

app.get("/desktop", authenticate, function(req, res) {
  res.render("desktop");
})

app.get("/secretroute", authenticate, function(req, res) {
  res.send(store.get(req.decoded.user).userdata.background)
});

app.get("/wipe", function(req, res) {
  store.clear();
  res.send("done!")
})

app.post("/login", function(req, res) {

  if (store.has(req.body.username)) {
    if (req.body.password == store.get(req.body.username).password) {
      const token = jwt.sign({
        user: req.body.username
      }, 'shhhhh');
      res.cookie("auth",token);
      return res.send("logged_in")
    } else {
      return res.send("bad_pass")
    }
  } else {
    return res.send("no_user")
  }

});

function isCorrectPassword(password) {
  return /^\d+$/.test(password)
}

app.post("/register", function(req, res) {
  if (store.has(req.body.username)) {
    return res.send("user_exists");
  } else if (!isCorrectPassword(req.body.password)) {
    return res.send("format_err");
  } else if (req.body.username == "") {
    return res.send("no_username")
  } else {
    store.set(req.body.username, {
      username: req.body.username,
      password: req.body.password,
      userdata: {
        background: {
          image: "/imgs/backgrounds/blue.png"
        }
      }
    })
    return res.send("user_created")
  }
})


app.listen(3000, function() {
  console.log("Server has started...");
});
