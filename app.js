const mysql = require('mysql2');
const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require('fs');
const app = express();
const port = 3000;

// Override console.log to save logs to a file
const logFile = fs.createWriteStream('./server.log', { flags: 'a' }); // Append mode
const originalLog = console.log;

console.log = (...args) => {
    const timestamp = new Date().toISOString();
    const message = `${timestamp} - ${args.join(' ')}\n`;
    logFile.write(message); // Write to file
    originalLog(...args); // Still log to console
};

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const db = mysql.createConnection({
    host: "retro-ciecie.pl",
    user: "remoteadmin",
    password: "laspalmas",
    database: 'inventa'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.post('/api/getbybarcode', (req, res) => {
    const { post_barcode } = req.body;
  
    if (!post_barcode) {
      return res.status(400).json({ error: 'Barcode is required' });
    }
  
    console.log('Received barcode:', post_barcode);
  
    db.query('SELECT * FROM products WHERE barcode = ?', [post_barcode], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Database error');
      }
      if (!result.length) {
        res.json([
          { id_product: '-1', product_name: '', barcode: post_barcode, image_url: '', quantity: '0', price: '', description: ''},
        ]);
      } else {
        res.json(result[0]);
      }
    });
});

app.post('/api/getbyid', (req, res) => {
    const { post_id } = req.body;

    if (!post_id) {
        return res.status(400).json({ error: 'Id is required' });
    }

    console.log('Received id:', post_id);

    db.query('SELECT * FROM products WHERE id_product = ?', [post_id], (err, result) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!result.length) {
                res.json({ id_product: '-1', product_name: '', barcode: '', image_url: '', quantity: '0', price: '', description: ''});
            } else {
                res.json(result[0]);
            }
        }
    });
});

app.post('/api/update', (req, res) => {
    console.log('try to update');
    const {id_product, product_name, barcode, quantity, price, description} = req.body;
    db.query(`SELECT id_product FROM products WHERE id_product="${id_product}"`, (err, result) => {
        if (err){
            console.log('error on /api/update');
            res.status(500).send(err);
        } else {
            if (!result.length){
                db.query(`INSERT INTO products (product_name, barcode, quantity, price, description) values ("${product_name}", "${barcode}", "${quantity}", "${price}", "${description}")`, (err, result) => {
                    if (err){
                        res.status(500).send(err);
                    } else {
                        res.status(200).send('inserted product into the db');
                    }
                });
            } else  {
                db.query(`UPDATE products SET product_name="${product_name}", barcode="${barcode}", quantity="${quantity}", price="${price}", description="${description}" WHERE id_product=${id_product}`, (err, result) => {
                    if (err){
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        console.log('update');
                        res.status(200).send(`updated product with id: ${id_product}`);
                    }
                });
            }
        }
    });
});

app.post('/api/delete', (req, res) => {
    console.log('try to delete');
    const {id_product} = req.body;
    db.query(`SELECT id_product FROM products WHERE id_product="${id_product}"`, (err, result) => {
        if (err){
            console.log('DELETE: error while searching the db for the product');
            res.status(500).send(err);
        } else {
            if (!result.length){
                console.log(`DELETE: product with id: ${id_product} not found in the db`);
                res.status(200).send(`DELETE: product with id: ${id_product} not found in the db`);
            } else  {
                db.query(`DELETE FROM products WHERE id_product="${id_product}"`, (err, result) => {
                    if (err){
                        console.log(err);
                        res.status(500).send(err);
                    } else {
                        console.log(`DELETE: product with id: ${id_product} deleted successfully`);
                        res.status(200).send(`DELETE: product with id: ${id_product} deleted successfully`);
                    }
                });
            }
        }
    });
});

app.post('/api/getallproducts', (req, res) => {
    db.query(`SELECT id_product as id, product_name as name FROM products`, (err, result) => {
        if (err){
            console.log('error on /api/getallproducts');
            res.status(500).send(err);
        } else {
            console.log('fetching all products ok');
            res.json(result);
        }
    });
});

app.get('/api/test',(req, res) => {
    res.status(200).send('working');
});

app.listen(port, 'localhost', () => {
    console.log(`server started on ${port}`);
});
