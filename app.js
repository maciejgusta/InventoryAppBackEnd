const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: 'inventa'
});

db.connect((err) => {
    if (err) {
      console.error('Nie udało się połączyć z bazą danych:', err.message);
      return;
    }
    console.log('Połączono z bazą danych');
  });


app.get('/products/barcode',(req, res) => {
    const query = "SELECT * FROM products WHERE barcode = ''"


});

app.listen(port, () => {
    console.log(`server started on ${port}`);
});