import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'secrets',
  password: 'M1server370!!',
  port: 5432
})

db.connect();

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkUser = await db.query('select * from users where email = ($1)', [email]);

    if (checkUser.rows.length > 0) {
      console.log('user already added, try logging in :3')
    } else {
      await db.query('insert into users (email, password) values ($1,$2)', [email, password])
      res.render("secrets.ejs")
    }
  } catch (error) {
    res.render('register.ejs')
    console.log('an error occured try again')
    console.log(error)
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;
  try {
    const checkUser = await db.query('select * from users where email = ($1)', [email]);

    if (checkUser.rows.length > 0) {
      if(password === checkUser.rows[0].password){
        res.render('secrets.ejs');
      }else{
        console.log('wrong password, try again');
        res.render('login.ejs')
      }
    } else {
      console.log('user not found, register pls');
      res.render('login.ejs')
    }
  } catch (error) {
    res.render('login.ejs')
    console.log('an error occured try again')
    console.log(error)
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
