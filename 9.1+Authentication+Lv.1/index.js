import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';
import bcrypt from 'bcrypt'

const app = express();
const port = 3000;
const saltRounds = 10; //round di salt che voglio fare per l'hash della password

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const db = new pg.Client({ //istanza del db
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
    const checkUser = await db.query('select * from users where email = ($1)', [email]); //controllo se l'utente e' gia reguistrato

    if (checkUser.rows.length > 0) {
      console.log('user already added, try logging in :3')
    } else {
      bcrypt.hash(password, saltRounds, async (err, hash) => { //se non e' registrato faccio l'hash della psw
        if (err) {
          console.log('error hashing password: ', err)
        } else {
          await db.query('insert into users (email, password) values ($1,$2)', [email, hash]) //se va tutto bene lo aggiungo al db
        }
      })
      res.render("secrets.ejs")
    }
  } catch (error) {
    res.render('register.ejs')
    console.log('an error occured try again: ', error)
  }
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const loginPassword = req.body.password;
  try {
    const checkUser = await db.query('select * from users where email = ($1)', [email]); //controllo se l'utente e' gia' registrato

    if (checkUser.rows.length > 0) {
      bcrypt.compare(loginPassword,checkUser.rows[0].password, (err,result)=>{ //controllo che la psw inserita corrisponda a quella nel db
        if(result){
          res.render('secrets.ejs');
        }else{
          console.log('error during login: ',err)
          res.render('login.ejs')
        }
      })
    } else {
      console.log('user not found, register pls');
      res.render('login.ejs')
    }
  } catch (error) {
    res.render('login.ejs')
    console.log('an error occured try again: ', error)
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
