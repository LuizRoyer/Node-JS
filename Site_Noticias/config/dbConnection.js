var mysql = require('mysql');

var connMysql = function () {
    //  executar este comando no MYSQL
    //ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';
    return connection = mysql.createConnection({
        multipleStatements: true,
        host: 'localhost',
        user: 'root',
        password: '1234',
        database: 'portal_noticias',
    });
};
module.exports = function () {
    return connMysql;
};