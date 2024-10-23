const mysql = require('mysql');
console.log(mysql);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    passoword: 'admin',
    database: 'jadzia'
});

db.connect((err) => {
    if (err) {
      throw err;
    }
    console.log('Connected to MySQL database');
  });