const mysql = require('mysql2');
const express = require('express');

const app = express();
const port = 3000;

app.use(express.json());

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

app.post('/api/getbybarcode', (req, res) => {
    console.log('Request body:', req.body); // Debugging line
    const { barcode } = req.body;
    db.query('SELECT * FROM products WHERE barcode = ?', [barcode], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!result.length) {
                res.json("new");
            } else {
                res.json(result);
            }
        }
    });
});




app.post('/api/test', (req, res) => {
    res.json("working");
});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});