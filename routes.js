const express = require('express')
const routes = express.Router()

routes.get('/', (req, res)=>{ //responde con la lista de libros que se tiene
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)

        conn.query('SELECT * FROM books', (err, rows)=>{
            if(err) return res.send(err) //seleccionar todo lo que esté en la tabla

            res.json(rows) //se envian los datos en formato json
        })
    })
})

routes.post('/', (req, res)=>{ 
    req.getConnection((err, conn)=>{
        if(err) return res.send(err) //error
        conn.query('INSERT INTO books set ?', [req.body], (err, rows)=>{ 
            if(err) return res.send(err) 

            res.send('book added!') //muestra la consulta
        })
    })
})

routes.delete('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM books WHERE id = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('book excluded!')
        })
    })
})

routes.put('/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE books set ? WHERE id = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err)

            res.send('book updated!')
        })
    })
})

module.exports = routes //exportar las rutas 
