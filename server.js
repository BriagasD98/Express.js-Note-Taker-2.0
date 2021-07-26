// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');
const db = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Server listens and initializes
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});