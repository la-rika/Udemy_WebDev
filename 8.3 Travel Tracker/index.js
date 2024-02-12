import express from "express";
import bodyParser from "body-parser";
import pg from 'pg';

const app = express();
const port = 3000;

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'world',
  password: 'M1server370!!',
  port: 5432
})

db.connect()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


app.get("/", async (req, res) => {
  let countries = []
  try {
    await db.query('SELECT country_code FROM visited_countries;')
      .then((response) => {
        // console.log(response.rows)
        response.rows.forEach((el) => {
          countries.push(el.country_code)
          // console.log(countries)
        })
      })
  } catch (error) {
    console.log('query failed', error)
  }
  res.render('index.ejs', { countries: countries, total: countries.length })
});

app.post('/add', async (req, res) => {
  const addedCountry = req.body['country'];
  let addedCountryCode = '';
  // console.log(addedCountry)
  try {
    await db.query(`SELECT * from countries WHERE country_name = $1;`, [addedCountry]) //i values della query devono esse in forma di array
      .then((response) => {
        // console.log(response.rows)
        if (response.rows.length > 0) {
          addedCountryCode = response.rows[0].country_code;
          // console.log(addedCountryCode)
          try {
            db.query('INSERT INTO visited_countries (country_code) VALUES ($1);', [addedCountryCode])
          } catch (error) {
            console.log('query failed',error)
          }
        }
        res.redirect('/')
      })
  } catch (error) {
    console.log('query failed',error);
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
