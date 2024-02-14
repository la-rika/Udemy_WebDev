import express from "express";
import bodyParser from "body-parser";
import pg from 'pg'

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "permalist",
  password: "M1server370!!",
  port: 5432,
});

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let items =[]

app.get("/",  async(req, res) => {
  items = [];
  try {
    await db.query('SELECT * FROM items')
    .then((response)=> {
      // console.log(response.rows);
      response.rows.forEach(el=>{
        items.push(el);
        // console.log(items)
      })
    })
  } catch (error) {
    console.log(error)
  }

  res.render("index.ejs", {
    listTitle: "Today",
    listItems: items,
  });
});

app.post("/add", (req, res) => {
  const item =req.body.newItem;
  console.log(item)
  try {
    db.query('INSERT INTO items (title) VALUES ($1)',[item])
  } catch (error) {
    console.log(error)
  }
  res.redirect("/");
});

app.post("/edit", (req, res) => {
  const updatedItem =req.body.updatedItemTitle;
  const updatedItemID = req.body.updatedItemId

  console.log(updatedItem)
  try {
    db.query('UPDATE items SET title = ($1) WHERE id = ($2)',[updatedItem,updatedItemID])
  } catch (error) {
    console.log(error)
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const deleteItemID = req.body.deleteItemId

  try {
    db.query('DELETE FROM items WHERE id = ($1)',[deleteItemID])
  } catch (error) {
    console.log(error)
  }
  res.redirect("/");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
