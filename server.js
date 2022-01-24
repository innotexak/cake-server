const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
require('dotenv').config()
var mongoose = require('mongoose')

var router = require('./routes/userRoute')


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use(function(req, res, next) {

    res.header('Access-Control-Allow-Credentials', true);
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,PATCH");
    res.header('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    next();
  } );

app.use('/', router)
var port = process.env.PORT || 8080
// const dbURI = "mongodb://localhost:27017/Cake"
var dbURI = 'mongodb+srv://innotex:innotexinnotex@cluster0.6lymd.mongodb.net/buzzroom?retryWrites=true&w=majority';
mongoose.connect(process.env.DEV_URL || dbURI,{useNewUrlParser:true, useUnifiedTopology:true}, 
).then(result=>{
    console.log('Database Connected')
}).catch(err=>{
    console.log(err.message)
})


app.listen(port, ()=>{
console.log("Server started on port: ", port)
})