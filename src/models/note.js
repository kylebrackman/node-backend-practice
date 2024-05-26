const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: String
});

module.exports = mongoose.model('Note', notesSchema);   