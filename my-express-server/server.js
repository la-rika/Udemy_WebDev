
const express = require("express");
const app = express();

app.get("/", function(req,resp){

    resp.send("<h1>Hello >///< </h1>")

})

app.get("/about", function(req,resp){

    resp.send("<p style='text-align: center'>dhksjadhskajhfjksahfkajdshfjksahfjsahfjsgfegyfretwgfgdsjkfhsajkdfhajhfjkdahfkdjhfkjdahfjk</p>")

})

app.get("/hobbies", function(req,resp){

    resp.send("loving my mocha")

})

app.listen(3000, function(){

    console.log("hey the server started !");

})