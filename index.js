var express = require('express');
// var session = require('express-session');
var app = express();

app.set('view engine', 'ejs')

app.use('/static', express.static('static'));

// app.use(session({
//     secret: 'random-long-secret',
//     resave: false,
//     saveUninitialized: true
// }));

require('./routes/auth')(app);
require('./routes/user')(app);
require('./routes/movie')(app);

var server = app.listen(3000, function () {
    console.log('On: 3000');
});
