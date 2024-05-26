const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');

mongoose.set('strictQuery', false);
const app = express();
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3000;
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
    } catch(e) {
        res.status(500).json({ error: e.message})
    }
});

app.get('/api/customers', (req, res) => {
    res.send({ "customers": customer })
});

app.get('/', (req, res) => {
    res.send("Welcome!");
});

app.post('/', (req, res) => {
    res.send('This is a post request.');
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