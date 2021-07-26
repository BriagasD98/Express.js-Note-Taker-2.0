// Dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
// Unique ID generator
const { v4: uuidv4 } = require("uuid");
// Saved notes in JSON format
const notes = require('./db/db.json');

// Express
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// htmlRoutes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// ApiRoutes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
    });
    res.send(notes);
});

// Server listens and initializes
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});