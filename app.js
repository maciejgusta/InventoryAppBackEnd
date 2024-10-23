var mysql = require('mysql2');

var db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: 'jadzia'
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

const query = "SELECT * FROM users";

db.query(query, (err, result) => {
    if (err) {
        console.log('error');
    } else {
        console.log(result);
    }
  });
