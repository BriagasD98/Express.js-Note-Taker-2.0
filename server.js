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
// notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

// ApiRoutes
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
// POST
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    notes.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
    });
    res.send(notes);
    console.log("Note Saved!")
});
// DELETE
app.delete('/api/notes/:id', (req, res) => {
    notes.forEach((note, i) => {
    // removes note by id
        if (note.id === req.params.id) {notes.splice(i, 1)}
    });
    // rewrites notes to json file
    fs.writeFile('db/db.json', JSON.stringify(notes), (err) => {
        if (err) throw err;
    });
    res.send(notes);
    console.log("Note Deleted!")
});

// Server listens and initializes
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});