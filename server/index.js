const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

//usar cors para que no bloquee el envío de datos

app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'empleados_crud',
});

//peticion de guardar

app.post('/create', (req, res)=> {
    //const nombre = req.body.nombre; aqui se dice que se esta recibiendo esta valiable la cual tiene este nombre
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;
    //si en values pongo ? es porque es una promesa que se enviará más adelante esos valores luego de esto se ponen los valores separados por , 
    db.query('insert into empleados (nombre, edad, pais, cargo, anios) values (?, ?, ?, ?, ?)',[nombre, edad, pais, cargo, anios],
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send("Empleado registrado con exito");
        }
    }
    );
});

app.get('/empleados', (req, res)=> {
    db.query('select * from empleados ',
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.put('/update', (req, res)=> {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const anios = req.body.anios;

    db.query('UPDATE empleados set nombre= ?, edad=?, pais=?, cargo=?, anios=? WHERE id= ?',[nombre, edad, pais, cargo, anios,id],
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.delete('/delete/:id', (req, res)=> {
    const id = req.params.id;
    

    db.query('DELETE FROM empleados WHERE id= ?',id,
    (err,result) => {
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    }
    );
});

app.listen(3001,()=>{
    console.log('soy el back y estoy corriendo en el puerto 3001');
})