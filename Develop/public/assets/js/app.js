//Dependencies

const express = require('express');
const app = express();
const fs = require("fs");

//Listen for requests
app.listen(5500);

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//Functions to handle requests
//Respond to URL routes for notes and homepage
app.get('/notes', (req, res) => {
    res.sendFile('./public/notes.html', {root: __dirname});
})

app.get('/index', (req, res) => {
    res.sendFile('./public/index.html', {root: __dirname});
})

//Create servers
//Start our server