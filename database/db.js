require('dotenv').config();
const mysql = require('mysql2/promise');
const { mysqluser, mysqlpass, mysqlname } = require('../config');

module.exports = mysql.createConnection({
    user: mysqluser,
    password: mysqlpass,
    database: mysqlname,
})
