const mysql = require('mysql2');
const express = require('express');

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: 'jadzia'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});


app.get('/api/data', (req, res) => {
    const {table} = req.query;
    const query = "SELECT * FROM " + table;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(result);
        }
    });
});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});


