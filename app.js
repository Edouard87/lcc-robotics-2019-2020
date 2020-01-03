
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const fs = require("fs")

const routes = require('./routes/index');
const users = require('./routes/user');

const app = express();
const store = require("data-store")("users");

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("welcome")

});

app.get("/jobs/all/", function (req, res) {

  var files = fs.readdirSync(__dirname + "/public/apps/students/data/")
  res.send(files);

});


app.listen(3000, function() {
  console.log("Server has started...");
});
