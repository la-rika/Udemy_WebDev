const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//settaggio per utilizzare ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')) //diciamo ad express dove andare a prendere i file a cui facciamo riferimento (css, img...)

let newItems = ['something to do'];
let workItems = [];

app.get("/", (req, res) => {
    const date = new Date(); //creo l'oggetto data di oggi

    let options = {
        weekday: 'long', //string
        day: 'numeric',  //number 
        month: 'long'    //string
    }

    var day = date.toLocaleDateString('it-IT', options) //martedi 6 giugno

    //visualizzo il file list.ejs (ejs guarda sempre dentro la cartella views per i file)
    //a questo file passo anche la variabile kindOfDay che ha il valore di day (label: value)
    //il file ejs all'intenro del quale usiamo l evariabili e' il ejs template
    res.render("list", { title: day, newListItems: newItems }) //list: file in cui voglio usare i dati; {}: dati che voglio usare nel file html
})

app.post("/", (req, res) => {
    let item = req.body.newItem;
    if (req.body.list === 'Work List') { //list: valore del bottone che cambia in base al titolo della pagina e quindi alla route
        workItems.push(item);
        res.redirect("/work"); //quando avviene la post si e' reindirizzati alla home (get)salvandosi newItem
    } else {
        newItems.push(item);
        res.redirect("/"); 
    }

})

app.get("/work", (req, res) => {
    res.render("list", { title: "Work List", newListItems: workItems });
})


app.listen(3000, (req, res) => {
    console.log("the server is running on port 3000 !");
})