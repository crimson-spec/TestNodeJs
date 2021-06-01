const express = require('express')
const handleBars = require('express-handlebars')
const { urlencoded } = require('body-parser')
const mysql = require('mysql')

const port = 3000
const app = express()

//Start
app.listen(port, function(req,res){
    console.log('Server is running!')
})

//Conection
const sql = mysql.createPool({
    host:'localhost',
    database: 'test',
    user:'root',
    password:'',
    port:3306
})

//CSS and js
app.use('/lib/css', express.static('css'))
app.use('/lib/js', express.static('js'))


//Template
app.engine('handlebars', handleBars({
    defaultLayout:'main'
}))
app.set('view engine', 'handlebars')

//Routes
app.get('/', function(req,res){
    sql.query('SELECT * FROM clientes', function(err, results, fields){
        if(err) console.log(err)
        else res.render('select', {data: results})
    })
})

app.get('/update/:id', function(req,res){
    res.render('update', {id: req.params.id})
})