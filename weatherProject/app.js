const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {

    res.sendFile(__dirname + "/index.html");

    app.post("/", function (req, res) {
        console.log(req.body.cityName);

        const query = req.body.cityName;
        const apiKey = "7f0d1e1ad166f7726dff20cf8f027cd6";
        const units = "metric";

        // link api con i dati
        const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

        https.get(apiUrl, function (response) { // metodo get per ottenere i dati del api

            console.log(response.statusCode);

            response.on("data", function (data) { // metodo on per avere il message body dei dati ottenuti con l'api
                const weatherData = JSON.parse(data); // trasformo in u n file json i dati ottenuti
                const temp = weatherData.main.temp; // prendo i dati che mi servono come se fosse un oggetto javascript
                const weatherDescription = weatherData.weather[0].description;
                const icon = weatherData.weather[0].icon;
                const imageUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"

                res.write("<p>The weather is currently " + weatherDescription + "</p>");
                res.write("<h1>The temperature in "+ query+" is " + temp + " degrees</h1>");
                res.write("<img src=" + imageUrl + ">");
                res.send();
            })

        })
    })

})



app.listen(3000, function () {
    console.log("server started on port 3000");
})

