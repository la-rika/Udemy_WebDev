const express = require("express"); //framework per creare webapp con node (permette di hostare un server in locale)
const bodyParser = require("body-parser"); //modulo per ottenere dati dal html
const request = require("request"); //modulo per fare chiamate api (get request, post request...)
const https = require('https'); 


const app = express(); //faccio partire express

//rendo una cartella accessibile anche al server in modo da poter accedere ai miei file locali (immagini, css...)
app.use(express.static(__dirname));

app.use(bodyParser.urlencoded({ extended: true })); //codice necessario per body parses

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html"); //renderizzo il file html
})

//chimata di tipo post
app.post("/", function (req, res) {
    //ottengo i dati dagli input nel file html attraverso i nomi degli input stessi e al form con il method post
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;

    //dati che passiamo alla chiamata api
    //creiamo un oggetto con chiave e valori riconosciuti da mailchimp per mandare i dati in modo che vengano riconosciuti (tutto nellla docs di mailchimp)
    const data = {
        //members contiene i dati dell'utente (dati ottenuti con gli input)
        members: [
            {
                email_address: email,
                status: 'subscribed',
                //fields con i dati personali tipo (audience,settings,merge tags)
                merge_fields:{
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    var jsonData = JSON.stringify(data); //per la chiamata api ci servono i dati in formato json

    //api endpoint + list id
    //us21 = e' alla fine della api key e rappresenta il API_SERVER che ci e' stato assegnato   
    const url = "https://us21.api.mailchimp.com/3.0/lists/9a26bfbc50"

    const options={
        method: 'POST',
        //auth e' un parametro di https per autenticare la chiamata api in modo che la gente non ne possa fare a caso
        //mailchimp ha questo formato di autenticazione base randomString:apiKey
        auth: 'Lara:8c65623001da63d2ff2f28a2697b4e90-us21'
    }

    //eseguo la chiamata api di tipo post
    //response = dati che mando
    //salvo la request in una costante 
    const request = https.request(url,options,function(response){
        //cio che succede una volte che la request viene completata
        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on('data', function(data){
            //stampo in console i dati che mi ritorna la request (status code, e varie altre info riguardanti l'utente che ho appena aggiunto)
            console.log(JSON.parse(data))
        })
    })

    //passo i jsonData al server di mailchimp
    request.write(jsonData);
    //termino la request
    request.end();
})

app.listen(3000, function () {
    //quando il server viene attivato allora fai questo
    console.log("server is running on port 3000");
})

// {
//     "name": "$event_name",
//         "contact": $footer_contact_info,
//             "permission_reminder": "permission_reminder",
//                 "email_type_option": true,
//                     "campaign_defaults": $campaign_defaults
// }


//api key
//8c65623001da63d2ff2f28a2697b4e90-us21

//list id
//9a26bfbc50