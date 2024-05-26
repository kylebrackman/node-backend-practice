const express = require('express');
const mongoose = require('mongoose');
const Note = require('./models/note');

mongoose.set('strictQuery', false);
const app = express();
if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CONNECTION = process.env.CONNECTION;


const note = new Note({
    date: new Date(),
    title: 'First Note',
    content: 'This is the first note.'
})

const customer = [
    {
        name: 'John Doe',
        industry: 'IT',
    },
    {
        name: 'Jane Doe',
        industry: 'Finance',
    },
    {
        name: 'Kyle',
        industry: 'Health',
    }
];

app.get('/api/notes', async (req, res) => {
    const notes = await Note.find();
    res.send(notes);
});

app.get('/api/customers', (req, res) => {
    res.send({ "customers": customer })
});

app.get('/', (req, res) => {
    res.send(note);
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
    } catch (error) {
        console.error(error.message);
    };
}

start();