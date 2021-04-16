const Schema = require('mongoose').Schema;
const db = require('../config/db');

const User = db.model('User', {
    username: String,
    name: String,
    email: String,
    password: String,
    isadmin: Boolean,
    _movies: [{
        type: Schema.Types.ObjectId,
        ref: 'Movie',
    }]
});

module.exports = User;
