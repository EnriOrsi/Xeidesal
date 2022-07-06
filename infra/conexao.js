var mysql = require('mysql');

function conectar() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345678',
        database: 'xeidesal',
        multipleStatements: 'true'
    });
}
module.exports = function () {
    return conectar;
}