const express = require('express')
const app = express()
const bodyParser = require('body-parser')
var cors = require('cors')
var mongoose = require('mongoose')

var router = require('./routes/userRoute')


app.use(cors());
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


app.use('/api', router)
var port = process.env.port || 5001
const dbUri = "mongodb://localhost:27017/Cake"
mongoose.connect(dbUri,{useNewUrlParser:true, useUnifiedTopology:true}, 
).then(result=>{
    console.log('Db Connected')
}).catch(err=>{
    console.log(err.message)
})


app.listen(port, ()=>{
console.log("Server started on port: ", port)
})