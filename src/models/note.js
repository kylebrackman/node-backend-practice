const mongoose = require('mongoose');
const { required } = require('nodemon/lib/config');

const notesSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: String
});

module.exports = mongoose.model('Note', notesSchema);   