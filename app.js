const mysql = require('mysql');
console.log(mysql);

const db = mysql.createConnection({
    host: 'localhost',
    user: 'admin',
    passoword: 'admin',
    database: 'jadzia'
});

db.query('SELECT * FROM users;', (result) => {
    console.log(result);
});