//The password is ILoveProgramming
import express from "express";
import { dirname } from 'path';
import { fileURLToPath } from "url";

const app = express();
const port = 3000;
var userIsAuthorized = false;
const __dirname = dirname(fileURLToPath(import.meta.url))
app.use(express.urlencoded({ extended: true }));

const checkPassword = (req,res,next)=>{
    console.log(req.body.password);
    if(req.body.password ==='ILoveProgramming'){
        userIsAuthorized = true;
    }
    next();
}

app.use(checkPassword)


app.get('/', (req,res)=>{
    userIsAuthorized = false;
    res.sendFile(__dirname + '/public/index.html');
})

app.post('/check',(req,res)=>{
    if(userIsAuthorized){
        res.sendFile(__dirname+'/public/secret.html')
    }else{
        res.redirect('/')
    }
})



app.listen(port,()=>{
    console.log('server up and running on port ' + port)
})