var bodyparser = require("body-parser")
var logger = require("morgan");
var mongoose = require("mongoose")
var axios = require("axios");
var cheerio = require("cheerio");


var express = require("express")
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
app.use(
    bodyparser.urlencoded({
        extended:false
    })
);

// Make public a static folder
app.use(express.static("public"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

mongoose.connect("mongodb://localhost/scraped_news", { 
    useNewUrlParser: true,
    useUnifiedTopology: true
 });
var db = mongoose.connection;

//This code will handle the db error connection and will let me know if I'm connected to mongoose
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function(){
    console.log("Connected to Mongoose!")
});


var port = process.env.PORT || 3000;
app.listen(port, function(){
    console.log("Listening on PORT " + port)
});