const mysql = require('mysql2');
require('dotenv').config()

const db = mysql.createConnection(
    {
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database: 'employeetracker'
    },
    console.log('Connected to the employee tracker database.')
);

module.exports = db;