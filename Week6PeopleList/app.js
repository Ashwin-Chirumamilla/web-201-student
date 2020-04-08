const express = require('express');
const url = require('url');
const fs = require('fs');

let rawData = fs.readFileSync('people.json');
let peopleJson = JSON.parse(rawData);

const hostname = "127.0.0.1";
const port = "3000";

let app = express();
app.set('view engine', 'ejs');



function homePage(req, res) {
    res.render('home');

}

function personPage(req, res) {
    let personFile;
    let parsedUrl = url.parse(req.url, true);
    let index = Number(parsedUrl.query.index);
    let currentPerson = peopleJson[index];

    res.render('person', {
        person: currentPerson
    });

}

app.get('/', homePage);
app.get('/person', personPage)

app.listen(port, hostname, ()=>{
    console.log(`Listening on http://${hostname}:${port}`);
});


