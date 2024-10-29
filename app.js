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


app.get('/api/login', (req, res) => {
    const {username, password} = req.query;
    const query = `SELECT * FROM users where username="${username}" and password="${password}"`;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!result.length){
                res.json(false);
            } else {
                res.json(result[0]);
            }
        }
    });
});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});