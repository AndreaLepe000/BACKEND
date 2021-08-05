const express = require('express')
const mysql = require('mysql')
const myconn = require('express-myconnection')

const routes = require('./routes')

const app = express()
app.set('port', process.env.PORT || 9000) //propiedad del puerto con valor 9000
const dbOptions = {
    host: 'localhost', //banco de datos instalado, MySQL
    port: 3306, //puerto por defecto de Mysql
    user: 'root', //por defecto también
    password: 'abc123', 
    database: 'library'
}

// middlewares
app.use(myconn(mysql, dbOptions, 'single')) 
app.use(express.json())

// routes
app.get('/', (req, res)=>{
    res.send('Welcome to my API')
})
app.use('/api', routes)

// server running 
app.listen(app.get('port'), ()=>{ //se obtiene el valor del puerto .get
    console.log('server running on port', app.get('port')) 
})
