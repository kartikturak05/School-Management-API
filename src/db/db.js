
const mysql = require('mysql');

// Create a MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', 
    database: 'school_management'
});

// Connect to the database
db.connect(err => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
        return;
    }
    console.log('Connected to MySQL');

    // Create the schools table if it doesn't exist
    const createTableQuery = `
        CREATE TABLE IF NOT EXISTS schools (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            address VARCHAR(255) NOT NULL,
            latitude FLOAT NOT NULL,
            longitude FLOAT NOT NULL
        );
    `;

    db.query(createTableQuery, (err, result) => {
        if (err) {
            console.error('Error creating the table:', err.stack);
            return;
        }
        console.log('Schools table is ready');
    });
});

module.exports = db;


