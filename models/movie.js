const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Movie = db.model('Movie', {
    title: String,
    directedby: String,
    year: Number,
    category: String,
    cast: Array,
    available: Number,
    image: String,
});

module.exports = Movie;
