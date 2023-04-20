const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

//rendo una cartella accessibile anche al server in modo da poter accedere ai miei file locali (immagini, css...)
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req,res){
    var firstName= req.body.firstName;
    var lastName= req.body.lastName;
    var email= req.body.email;

    console.log(firstName, lastName, email)
})

app.listen(3000, function(){
    console.log("server is running on port 3000");
})