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
    const { barcode } = req.body;
    db.query('SELECT * FROM products WHERE barcode = ?', [barcode], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!result.length) {
                res.json([{"product_name":"", "barcode":barcode, "image_url":"", quantity: 0}]);
            } else {
                res.json(result);
            }
        }
    });
});

app.post('/api/getbyname', (req, res) => {
    const { name } = req.body;
    db.query('SELECT * FROM products WHERE product_name = ?', [name], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!result.length) {
                res.json([{"product_name":name, "barcode": "", "image_url":"", quantity: 0}]);
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