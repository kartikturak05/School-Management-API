
const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Inside School management api');
  });

app.post('/addSchool', (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    if (!name || !address || !latitude || !longitude) {
        return res.status(400).send('All fields are required.');
    }

    const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
    db.query(query, [name, address, latitude, longitude], (err, result) => {
        if (err) throw err;
        res.status(201).send('School added successfully.');
    });
});

// List Schools API
app.get('/listSchools', (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude) {
        return res.status(400).send('Latitude and longitude are required.');
    }

    const query = `
        SELECT *, 
        ( 6371 * acos( 
            cos( radians(?) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(?) ) + 
            sin( radians(?) ) * sin( radians( latitude ) ) 
        )) AS distance 
        FROM schools 
        ORDER BY distance;
    `;
    db.query(query, [latitude, longitude, latitude], (err, results) => {
        if (err) throw err;
        res.json(results);
    });

});

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
