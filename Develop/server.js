//Dependencies
const express = require('express');
const app = express();
const fs = require("fs");
const sid = require('shortid');
var path = require("path");

const PORT = 5500;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
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
//GET to read `db.json` file 

app.get("/api/notes", (req, res) => {
    //     //read file functionality
    fs.readFile('./db/db.json', function (err, data) {
        if (err) throw err;
        JSON.parse(data);

        const notes = JSON.parse(data);
        res.json(notes);
    })
})

//POST to receive a new note to save on request body, add it to the `db.json` file and return the new note to client

app.post("/api/notes", (req, res) => {
    fs.readFile('.db/db.json', function (err, data) {
        if (err) throw err;
        JSON.parse(data);

        const notes = JSON.parse(data);
        let newNote = {
            title: req.body.title,
            text: req.body.text,
            id: sid.generate()
        }

        notes.push(newNote);
        fs.writeFile(__dirname + "/Develop/db/db.json", JSON.stringify(notes, null, 2), function (err) {
            if (err) throw new Error(err);
            res.send("Note successfully saved!");
        });
    })
})

//DELETE note by id number after it's been saved.  First, read all notes from the `db.json` file and remove the note with the given id number.  Last, rewrite the notes in the `db.json` file.

app.delete("'api/notes/' + id", (req, res) => {

    fs.readFile('db.json', function (err, data) {
        if (err) throw err;
        const dbobject = JSON.parse(data);
        const idremove = req.params.id;
        for (let i = 0; i < dbobject.length; i++) {
            if (dbobject[i].id.toString() === idremove) {
                dbobject.splice(i, 1);
            } else {
                console.log("No matching id");
            }
        }

        fs.writeFile('db.json', JSON.stringify(dbobject, null, 2), function (err, data) {
            if (err) throw err;
            res.send(`Note ${idremove} has been removed!`)
        })

    })
})

//Start our server
app.listen(PORT, function () {
    console.log(`App now listening on port ${PORT}`)
})