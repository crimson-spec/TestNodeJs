const express = require('express')
const { urlencoded } = require('body-parser')

const port = 3000
const app = express()

app.listen(port, function(req,res){
    console.log('Server is running!')
})

//Routes
app.get('/', function(req,res){
    res.sendFile(__dirname+'/views/index.html')
})

app.post('/insert', urlencoded, function(req,res){

})