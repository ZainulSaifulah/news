var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
require("dotenv").config();
var db = require("./models");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

db.connect()

require("./routes/users.routes")(app);
require("./routes/role.routes")(app);
require("./routes/post.routes")(app);

module.exports = app;
