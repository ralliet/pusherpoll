const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const voteSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: Number,
        required: true
    }
});

//create collection and add schema
const Vote = mongoose.model('Vote', voteSchema);


module.exports = Vote;