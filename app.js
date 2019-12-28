
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

function getMainDir(maindirname) {

  var maindir = fs.readdirSync(__dirname + "/public/apps/fileExplorer/" + maindirname);
  
  var index = maindir.indexOf(".DS_Store");
  if (index > -1) {
    maindir.splice(index, 1);
  }
  return maindir;
  
}

app.get("/", function(req, res) {

  res.render("desktop")

});

app.get("/jobs/all/", function (req, res) {

  var files = fs.readdirSync(__dirname + "/public/apps/students/data/")
  res.send(files);

});

app.get("/dirlookup/:maindir/:colnum/:itemnum", function (req, res) {
  
  var maindir = getMainDir(req.params.maindir)

  if (req.params.colnum == 0) {
    return res.send(maindir);
  };
  
  var file = fs.readdirSync(__dirname + "/public/apps/fileExplorer/" + req.params.maindir + "/" + maindir[req.params.itemnum]);
  
  res.send(file);

})

app.get("/textlookup/:maindir/:subdir/:subsubdir", function(req, res) {
  
  var maindir = getMainDir(req.params.maindir)
  var person = fs.readFileSync(__dirname + "/public/apps/fileExplorer/" + req.params.maindir + "/" + maindir[req.params.subdir] + "/" + req.params.subsubdir + "/english.desc", "utf-8");
  res.send(person)

})


app.listen(3000, function() {
  console.log("Server has started...");
});
