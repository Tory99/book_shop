const mariadb = require('mysql2')

const db = mariadb.createConnection({
    host : process.env.DB_HOST,
    user : process.env.DB_USER,
    password : process.env.DB_PASSWORD,
    database : process.env.DB_DATABASE,
    port : process.env.DB_PORT,
    dataStrings : true
});

module.exports = db;