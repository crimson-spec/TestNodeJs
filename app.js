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
    sql.query('SELECT * FROM clientes WHERE document=?', [req.params.id], function(err, results, fields){
        if(err) console.log(err)
        else res.render('update', {data: results})
    })
    
})

app.post('/controllerForm', urlencoded, function(req,res){
    sql.query('UPDATE clientes SET document=?, name=?, birth=?, phone=? WHERE document=?',
    req.params.document,
    req.params.name,
    req.params.birth,
    req.params.phone,
    req.params.document,
    )
    res.redirect('/')
})