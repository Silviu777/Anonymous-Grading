import mariadb from 'mariadb';

const pool = mariadb.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: "password",
    database: 'anonymous_grading',
    connectionLimit: 10
});

export default

    pool.getConnection()
        .then(conn => {
            console.log("Connected to the database!");
            conn.release();
        })
        .catch(err => {
            console.log(err);
        })