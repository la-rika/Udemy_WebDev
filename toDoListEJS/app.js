const express = require("express");
const bodyParser = require("body-parser");
const getDay = require(__dirname + "/day.js")
const mongoose = require('mongoose')

const app = express();

//settaggio per utilizzare ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')) //diciamo ad express dove andare a prendere i file a cui facciamo riferimento (css, img...)

mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });

const itemsSchema = new mongoose.Schema({
    name: String
})

const Item = mongoose.model('item', itemsSchema)

const item1 = new Item({
    name: 'be happy'
})

const item2 = new Item({
    name: 'dont tilt'
})

const item3 = new Item({
    name: 'love yourself and your company'
})

const defaultItems = [item1,item2,item3]


app.get("/", (req, res) => {
    //visualizzo il file list.ejs (ejs guarda sempre dentro la cartella views per i file)
    //a questo file passo anche la variabile kindOfDay che ha il valore di day (label: value)
    //il file ejs all'intenro del quale usiamo l evariabili e' il ejs template
    Item.find().then(function(items){
        if(items.length===0){
            Item.insertMany(defaultItems).then(function(){
                console.log('items successfully saved')
            }).catch(function(err){
                console.log(err)
            })
        }else{
            res.render("list", { title: "today", newListItems: items }) //list: file in cui voglio usare i dati; {}: dati che voglio usare nel file html
        }
    }).catch(function(err){
        console.log(err)
    })
})

app.post("/", (req, res) => {
    const item = req.body.newItem;
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