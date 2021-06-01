const express = require('express')
const handleBars = require('express-handlebars')
const bodyParser = require('body-parser')
const mysql = require('mysql')

const port = 3000
const app = express()
const urlencodeParser = bodyParser.urlencoded({extended:false})

//Start
app.listen(port, function(req,res){
    console.log('Server is running!')
})

//Conection
const sql = mysql.createPool({
    host:'localhost',
    database:'test',
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
    sql.query('SELECT * FROM clientes WHERE document=?', [req.params.id], 
    function(err, results, fields){
        if(err) console.log(err)
        else res.render('update', {data: results})
    })
    
})

app.get('/insert', function(req,res){
    res.render('update')
})

app.get('/delete/:id', function(req,res){
    sql.query('DELETE FROM clientes WHERE document=?', [req.params.id], 
    function(err, results, fields){
        if(err) console.log(err)
        else res.redirect('/')
    })
})

app.post('/controllerInsert', urlencodeParser, function(req,res){
    sql.query('INSERT INTO clientes VALUES(?,?,?,?)',
    [
        req.body.document,
        req.body.name,
        req.body.birth,
        req.body.phone
    ]), function(err, results, fields){
        if(err) console.log(err)
        else res.redirect('/')
    }
})

app.post('/controllerUpdate', urlencodeParser, function(req,res){
    sql.query('UPDATE clientes SET document=?, name=?, birth=?, phone=? WHERE document=?',
    [
        req.body.document,
        req.body.name,
        req.body.birth,
        req.body.phone,
        req.body.document
    ]), function(err, results, fields){
        if(err) console.log(err)
        else res.redirect('/')
    }
})