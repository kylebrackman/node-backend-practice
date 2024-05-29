const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');
const cors = require('cors');

mongoose.set('strictQuery', false);
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION = process.env.CONNECTION;


const note = new Note({
    date: new Date(),
    title: 'Second Note',
    content: 'This is the first note.'
});

app.get('/api/notes', async (req, res) => {
    try {
        const result = await Note.find();
        res.send({ "notes": result });
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
});

app.get('/api/customers', (req, res) => {
    res.send({ "customers": customer })
});

app.get('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        console.log(noteId);
        const note = await Note.findById(noteId);
        console.log(note);
        if (!note) {
            res.status(404).json({ error: 'Note not found.' });
        } else {
            res.json({ note });
        }
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.put('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const result = await Note.replaceOne({_id: noteId}, req.body)
        res.json({ updatedCount: result.modifiedCount })
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.delete('/api/notes/:id', async (req, res) => {
    try {
        const noteId = req.params.id;
        const result = await Note.deleteOne( {_id: noteId}, req.body )
        res.json({ deletedCount: result.deletedCount }); 
    } catch (e) {
        res.status(500).json({ error: 'Something went wrong.' });
    }
});

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.post('/api/notes', async (req, res) => {
    console.log(req.body);
    const note = new Note(req.body);
    try {
        await note.save();
        res.status(201).json({ note });
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
});

app.post('/api/customers', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});



const start = async () => {

    try {
        await mongoose.connect(CONNECTION);

        app.listen(PORT, () => {
            console.log(
                'App listening on port ' + PORT
            )
        });
    } catch (e) {
        console.error(e.message);
    };
}

start();