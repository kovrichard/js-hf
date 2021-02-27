var express = require('express');
var session = require('express-session');
var app = express();

app.use('/static', express.static('static'));

app.use(session({
    secret: 'random-long-secret',
    resave: false,
    saveUninitialized: true
}));

var authMW = (req, res, next) => {
    // check whether user is logged in
    // if he is, call next
    // if not, redirect to login
    next();
}

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/views/index.html');
});

app.get('/login', (req, res, next) => {
    res.sendFile(__dirname + '/views/login.html');
});

app.get('/register', (req, res, next) => {
    res.sendFile(__dirname + '/views/register.html');
});

app.get('/movie', (req, res, next) => {
    res.sendFile(__dirname + '/views/movie.html');
});

app.get('/movies', (req, res, next) => {
    res.sendFile(__dirname + '/views/movies.html');
});

app.get('/movie-modify', (req, res, next) => {
    res.sendFile(__dirname + '/views/movie-modify.html');
});

app.get('/password-reset', (req, res, next) => {
    res.sendFile(__dirname + '/views/password-reset.html');
});

var server = app.listen(3000, function () {
    console.log('On: 3000');
});
