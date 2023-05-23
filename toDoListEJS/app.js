const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.get("/", (req, res) => {

    const date = new Date(); //creo l'oggetto data di oggi
    const today = date.getDay(); //ottendo il giorno della settimana (dom-sab) (0-6)
    let day = "";

    switch (today) {
        case 0:
            day = "sunday";
            break;
        case 1:
            day = "monday";
            break;
        case 2:
            day = "thursday";
            break;
        case 3:
            day = "tuesday";
            break;
        case 4:
            day = "wednesday";
            break;
        case 5:
            day = "friday";
            break;
        case 6:
            day = "saturday";
            break;
        default:
            console.log("error: the current date is " + today)
            break;
    }

    //visualizzo il file list.ejs (ejs guarda sempre dentro la cartella views per i file)
    //a questo file passo anche la variabil ekindOfDay che ha il valore di day (label: value)
    res.render("list", { kindOfDay: day })
})

app.listen(3000, (req, res) => {
    console.log("the server is running on port 3000 !");
})