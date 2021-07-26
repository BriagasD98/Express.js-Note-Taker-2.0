// Dependencies
const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require('path');
const uuidv4 = require("uuid/v4");
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

// Server listens and initializes
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});