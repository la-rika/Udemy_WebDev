// HINTS:
// 1. Import express and axios
import axios from 'axios';
import { dirname } from 'path';
import { fileURLToPath } from "url";
import express from 'express'

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const __dirname = dirname(fileURLToPath(import.meta.url))

// 3. Use the public folder for static files.
app.use(express.static('public'))

// 4. When the user goes to the home page it should render the index.ejs file.
// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.
app.get('/', async(req,res)=>{
    try{
        await axios.get('https://secrets-api.appbrewery.com/random')
        .then(response=>{
            res.render('index.ejs', {secret: response.data.secret, user: response.data.username})
        })
    }catch(err){
        console.log(err)
    }
})


// 6. Listen on your predefined port and start the server.
app.listen(port,()=>{
    console.log(`server is up and running on port ${port}`)
})