const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//body parser let us retrieve datas from the html form(num1,num2)
app.use(bodyParser.urlencoded({extended: true}));//urlencoded is used when we're passing something from a html file. extented is required e basta

//we send ahtml file
app.get("/",function(req,res){
    //I send a html file as a response
    res.sendFile(__dirname + "/index.html"); //__dirname : returns calclator.js location path, this is to find the index.html too
})

//we take datas from the from to do the operation
app.post("/",function(req,res){
    var num1 = Number(req.body.num1); //returns the request's body, so the html form info (num1,num2,submit)
    var num2 = Number(req.body.num2); //we pass them as numeric variables
    var result = num1+num2;

    res.send("The result is: "+result);
})

app.listen(3000,function(){
    console.log("server started successfully :)");
})