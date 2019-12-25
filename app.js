
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

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static("public"));

app.get("/", function(req, res) {

  res.render("desktop")

});

app.get("/jobs/all/", function (req, res) {

  // console.log("loading...")
  var files = fs.readdirSync(__dirname + "/public/apps/students/data/")
  // console.log(files)
  res.send(files);

});

app.get("/job/:job", function(req, res) {
  
  var people = fs.readdirSync(__dirname + "/public/apps/students/data/" + req.params.job)
  res.send(people);

});

app.get("/description/:job/:person", function(req, res) {
  
  var person = fs.readFileSync(__dirname + "/public/apps/students/data/" + req.params.job + "/" + req.params.person + "/english.desc","utf-8");
  res.send(person)

  // console.log()

})


app.listen(3000, function() {

  console.log("Server has started...");

});
