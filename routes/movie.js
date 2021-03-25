var renderMW = require('../middleware/generic/render');
var redirectMW = require('../middleware/generic/redirect');
var authMW = require('../middleware/auth/auth');
var getMovieMW = require('../middleware/movie/getMovie');
var getMoviesMW = require('../middleware/movie/getMovies');
var saveMovieMW = require('../middleware/movie/saveMovie');
var deleteMovieMW = require('../middleware/movie/deleteMovie');
var rentMovieMW = require('../middleware/movie/rentMovie');
var unrentMovieMW = require('../middleware/movie/unrentMovie');
var checkAdminMW = require('../middleware/auth/checkAdmin');
var getUserMW = require('../middleware/user/getUser');
var saveUserMW = require('../middleware/user/saveUser');
const auth = require('../middleware/auth/auth');

userModel = '';

module.exports = (app) => {
    var objectRepository = {
        userModel: userModel
    };

    app.get('/movie',
        authMW(objectRepository),
        getMoviesMW(objectRepository),
        renderMW(objectRepository, 'movies'),
    );

    app.use('/movie/new',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        saveMovieMW(objectRepository),
        renderMW(objectRepository, 'movie-modify'),
    );

    app.get('/movie/:movieid',
        authMW(objectRepository),
        getMovieMW(objectRepository),
        renderMW(objectRepository, 'movie'),
    );

    app.use('/movie/:movieid/modify',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        getMovieMW(objectRepository),
        saveMovieMW(objectRepository),
        renderMW(objectRepository, 'movie-modify'),
    );

    app.get('/movie/:movieid/delete',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        getMovieMW(objectRepository),
        deleteMovieMW(objectRepository),
        redirectMW(objectRepository, '/movie')
    );

    app.post('/movie/:movieid/rent',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getMovieMW(objectRepository),
        rentMovieMW(objectRepository),
        saveMovieMW(objectRepository),
        saveUserMW(objectRepository),
        redirectMW(objectRepository, '/')
    );

    app.post('/movie/:movieid/unrent',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getMovieMW(objectRepository),
        unrentMovieMW(objectRepository),
        saveMovieMW(objectRepository),
        saveUserMW(objectRepository),
        redirectMW(objectRepository, '/')
    );
};
