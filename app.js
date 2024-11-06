const mysql = require('mysql2');
const express = require('express');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: 'inventa'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('api/getbybarcode', (req, res) =>{
    const barcode = req.barcode;
    db.query(`SELECT * FROM products where barcode="${barcode}"`, (err, result) => {
        if (err){
            res.status(500).send(err);
        } else {
            if (!result.length){
                res.json("new");
            } else {
                res.json(result);
            }
        }
    });
});



app.post('api/test', (req, res) => {
    res.json("working");
});

app.post('/api/sign_up', (req, res) => {
    const {username, password, first_name, last_name} = req.body;

    if (!username || !password || !first_name || !last_name) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    db.query(`SELECT username FROM users where username="${username}"`, (err, result) => {
        console.log()
    });
});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});