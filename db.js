// Creating connection to MariaDB
// Code from https://mariadb.com/kb/en/getting-started-with-the-nodejs-connector/
const mariadb = require('mariadb');
const pool = mariadb.createPool({
    host: '192.168.1.110',
    user: 'nodejs-server',
    password: '1234',
    database: 'Library'
});

module.exports = Object.freeze({
    pool:pool
});