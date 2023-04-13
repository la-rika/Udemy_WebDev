const express = require("express"); //ottengo express per poterlo utilizzare (framework per creare webapp)
const https = require("https"); //modulo di node per fre chiamate api
const bodyParser = require("body-parser"); //ottengo dati dal html ottenuti con gli input

const app = express(); //utilizzo express

app.use(bodyParser.urlencoded({ extended: true })); //codice di default necessario per usare bodyParser

app.get("/", function (req, res) {
  //cosa succede quando sono nella home '/'
  //faccio in modo che a prescindere dal path del file esso venga trovato e renderizzato nella pagina
  res.sendFile(__dirname + "/index.html");

});

//gestisce le chiamate di tipo post (in questo caso il form in index.html)
app.post("/", function (req, res) {
  const queryLat = req.body.lat; //metto nel url api i dati ottenuti con l'input nel html
  const queryLon = req.body.lon; // lat e lon sono i rispettivi nomi degli input
  const apiKey = "7f0d1e1ad166f7726dff20cf8f027cd6";
  const unit = "metric";

  //chiamata di tipo get tramite api url
  const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + queryLat + "&lon=" + queryLon + "&units=" + unit + "&appid=" + apiKey;

  //faccio la chiamata api
  https.get(url, function (response) {
    //response: dati ottenuti tramite la chiamata api
    console.log(response, response.statusCode);

    response.on("data", function (data) {
      // cio che succede  una volta ottenuti i dati dal api
      const weatherData = JSON.parse(data); //quando ricevo i dati (data) trasformo tutto in un oggetto javascript
      const temp = weatherData.main.temp; //ottengo il valore di temp (mettere l'url su google e cliccare il campo per copiare il path)
      const weatherDescription = weatherData.weather[0].description; //ottengo il valore di description
      const icon = weatherData.weather[0].icon; // icona del meteo

      //write: permette di fare piu di un send facendo prima tanti write quanti gli elementi che vogliamo visualizzare
      res.write("<h1>The weather in "+queryLat+" , "+queryLon+" is " + temp + " degrees</h1>"); //res perche e' cio che visualizziamo  quando siamo nella home
      res.write("<p>Description: " + weatherDescription + "</p>");
      res.send(); //infine facciamo un send vuoto
    });
  });
});

app.listen(3000, function () {
  //dico a express di startare il server sulla porta 3000
  console.log("server is running on port 3000"); //quello che succede una volta che il server e' partitto
});
