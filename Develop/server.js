//Dependencies
const express = require('express');
const app = express();
const fs = require("fs");
var path = require("path");

const PORT = 5500;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Functions to handle requests
//Respond to HTML routes for notes and homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"));
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
})

//API Routes
//GET to read `db.json` file and return all saved notes as JSON

// app.get("/api/notes", (req, res) => {
//     //read file functionality

//     //respond with json

// })

//POST to receive a new note to save on request body, add it to the `db.json` file and return the new note to client

// app.post("<endpoint goes here>", (req, res) => {})

//DELETE note by id number after it's been saved.  First, read all notes from the `db.json` file and remove the note with the given id number.  Last, rewrite the notes in the `db.json` file.

// app.delete("<endpoint goes here>", (req, res) => {})

//Create servers
//Start our server
app.listen(PORT, function() {
    console.log(`App now listening on port ${PORT}`)
})