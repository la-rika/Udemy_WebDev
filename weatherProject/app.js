const express = require("express");
const app = express();
const https = require("https");

app.get("/",function(req,res){

    const apiUrl = "https://api.openweathermap.org/data/2.5/weather?lat=51.5073219&lon=-0.1276474&units=metric&appid=7f0d1e1ad166f7726dff20cf8f027cd6"
    https.get(apiUrl,function (response) {
        console.log(response);
    })
    res.send("the server is running")
})

app.listen(3000,function(){
    console.log("server started on port 3000");
})

