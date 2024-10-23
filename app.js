var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin",
    database: 'jadzia'
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});