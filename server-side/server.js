const express = require('express')
const https = require("https");
const cors = require('cors')
const bodyParser = require('body-parser')

module.exports = {}
const {User} = require('./db/classes/User');
const {Search} = require('./db/classes/Search')

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

const port = 8080;


app.get('/searchAPi', (req,response)=>{
    https.get(`https://itunes.apple.com/search?term=${req.query.term}&limit=25`, res => {
        res.setEncoding("utf8");
        let body = "";
        res.on("data", data => {
            body += data;
        });
        res.on("end", () => {
            body = JSON.parse(body);
            new Search(req.query.username,req.query.term).incrementCount() //TODO: add username search
            response.json(body)
        });
    })
})

app.post('/signUp', (req,res) => {
    new User({...req.body}).addToDb().then(doc => res.send(doc))
    .catch(err => res.status(500).send(err))
})

app.get('/signIn', (req,res) => {
    new User({...req.query}).login().then((isUser)=>res.send(isUser))
})

app.get('/topTenSearchs', (req,res)=> {
    new User({...req.query}).topTenSearchs().then(searchs => res.send(searchs))
})

app.listen(port,()=>console.log(`The Server is running on port ${port}.`))