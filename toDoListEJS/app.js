require("dotenv").config(); //express non legge da solo gli .env e gli serve questo
const express = require("express");
const bodyParser = require("body-parser");
// const getDay = require(__dirname + "/day.js")
const mongoose = require('mongoose')
const uri = process.env.URI;

const app = express();

//settaggio per utilizzare ejs
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname+'/public')) //diciamo ad express dove andare a prendere i file a cui facciamo riferimento (css, img...)


mongoose.connect("mongodb+srv://admin-lara:Adm1inH3r3@udemy-cluster.e18m7ig.mongodb.net/todolistDB", { useNewUrlParser: true });


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

const defaultItems = [item1, item2, item3]

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
})

const List = mongoose.model("List", listSchema)


app.get("/", (req, res) => {
    //visualizzo il file list.ejs (ejs guarda sempre dentro la cartella views per i file)
    //a questo file passo anche la variabile kindOfDay che ha il valore di day (label: value)
    //il file ejs all'intenro del quale usiamo l evariabili e' il ejs template
    Item.find().then((items) => {
        if (items.length === 0) {
            Item.insertMany(defaultItems).then(() => {
                console.log('items successfully saved')
            }).catch((err) => {
                console.log(err)
            })
        } else {
            res.render("list", { title: "today", newListItems: items }) //list: file in cui voglio usare i dati; {}: dati che voglio usare nel file html
        }
    }).catch((err) => {
        console.log(err)
    })
})

app.post("/", (req, res) => {
    const itemName = req.body.newItem;
    const item = new Item({
        name: itemName
    })
    item.save();
    res.redirect('/')
})

app.post('/delete', (req, res) => {
    const checkedItemId = req.body.checkbox;
    Item.findByIdAndRemove({ _id: String(checkedItemId) }).then(function () {
        console.log("Data deleted"); // Success
        res.redirect("/")
    }).catch(function (error) {
        console.log(error); // Failure
    });
})

//in base a cosa metto nel url dopo '/' vado in una nuova pagina
//dynamic routing
app.get('/:customList', (req, res) => {
    const customList = req.params.customList

    List.findOne({ name: customList }).then((result) => {
        if (result) { //result diverso da undefined
            res.render("list", { title: result.name, newListItems: result.items }) //list: file in cui voglio usare i dati; {}: dati che voglio usare nel file html
        } else {

            const list = new List({
                name: customList,
                items: defaultItems
            })

            list.save();
            setTimeout(() => { res.redirect('/' + customList); }, 2000);
        }
    })

})


app.listen(3000, (req, res) => {
    console.log("the server is running on port 3000 !");
})