const express = require('express');
const session = require('express-session');
const cookieParser = require("cookie-parser");

const app = express();
app.set('view engine', 'ejs')
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/static', express.static('static'));

app.use(session({
    secret: 'my-long-homework-secret',
    // resave: false,
    // saveUninitialized: true,
    // cookie: { secure: true }
}));

require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/movie')(app);

app.use((err, req, res, next) => {
    res.end('There was an error...');
    console.log(err);
});

var server = app.listen(3000, function () {
    console.log('On: 3000');
});
