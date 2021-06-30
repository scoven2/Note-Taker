//Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');

//unique id
const { v4: uuidv4 } = require('uuid');

//Express app set up
const app = express();
const PORT = process.env.PORT || 8888;

//data parsing, encouding, static, middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

//routes 
//index.html
app.get('.*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//return saved notes as json 
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

//api
app.get('/api/notes', (req, res) => {
    fs.readFile('./db.db.json', 'utf8', (error, data) => {
        console.log(data);
        res.send(data);
    })
});

//new note posted
// app.post('/api/notes', (req, res) => {
//     fs.readFile('./db/db.json', 'utf8', (error, data) => {
//         console.log(data)
//         const newNote = req.body
//         newNote.id = uuidv4()
//         const notes = JSON.parse(data)
//             //add new note
//         notes.push(newNote)
//             //save note array back to db file
//         fs.writeFile('./db/db.json', JSON.stringify(notes), () => {
//             res.send(newNote);
//         })
//     })
// });

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteLength = (noteList.length).toString();
    newNote.id = noteLength;
    noteList.push(newNote);
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})

//delete
// app.delete('/api/notes/:id', (req, res) => {
//     const noteId = req.params.id;
//     db.forEach((note) => {
//         if (noteId === note.id) {
//             const noteIndex = db.indexOf(note);
//             db.splice(noteIndex, 1);
//         }
//     });
//     res.send(db);
// });

app.delete('/api/notes/:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(selected => {
        return selected.id != noteId;
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
});

//listener
app.listen(PORT, () =>
    console.log(`App listening to PORT: ${PORT}`));