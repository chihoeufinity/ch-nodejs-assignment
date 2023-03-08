import mysql from 'mysql2';
import dotenv from 'dotenv'

const config = dotenv.config()

// create the connection to database
const connection = mysql.createConnection({
    host: config.parsed.DB_HOST,
    user: config.parsed.DB_USER,
    database: config.parsed.DB_NAME,
    password: config.parsed.DB_PASSWORD,
});
  
connection.connect(async function(err) {
    if (err) throw err;
    console.log("Connected!");
    
    let sql = "CREATE TABLE IF NOT EXISTS student (" +
            "student_email VARCHAR(255) NOT NULL UNIQUE," + 
            "teacher_email VARCHAR(255) NOT NULL," +
            "status TINYINT NOT NULL)";
            
    connection.query(sql, function (err, result) {
        if (err) throw err;
    });
});

export default connection;