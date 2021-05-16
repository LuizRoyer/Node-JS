import mysql from 'mysql'

const con = mysql.createConnection(
    {
        host: process.env.HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE
    });

export default (async (sqlQuery) => {
    return new Promise((resolve, reject) => {
        if (con) {
            con.connect(function (err) {
                if (err) throw err;
            });

            if (sqlQuery) {
                con.query(sqlQuery, function (error, result, fields) {
                    con.end();
                    if (error) {
                        throw error;
                    } else {
                        return resolve(result);
                    }
                });
            } else {
                con.end();
            }
        }
    });
})