var renderMW = require('../middleware/generic/render');
var authMW = require('../middleware/auth/auth');
var getMovieMW = require('../middleware/movie/getMovie');
var getMoviesMW = require('../middleware/movie/getMovies');
var saveMovieMW = require('../middleware/movie/saveMovie');
var deleteMovieMW = require('../middleware/movie/deleteMovie');
var checkAdminMW = require('../middleware/auth/checkAdmin');

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

    app.get('/movie/new',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        renderMW(objectRepository, 'movie-modify'),
    );

    app.post('/movie/new',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        saveMovieMW(objectRepository),
        renderMW(objectRepository, 'movies'),
    );

    app.get('/movie/:movieid',
        authMW(objectRepository),
        getMovieMW(objectRepository),
        renderMW(objectRepository, 'movie'),
    );

    app.get('/movie/:movieid/modify',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        getMovieMW(objectRepository),
        renderMW(objectRepository, 'movie-modify'),
    );

    app.post('/movie/:movieid',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        saveMovieMW(objectRepository),
        renderMW(objectRepository, 'movies'),
    );

    app.get('/movie/:movieid/delete',
        authMW(objectRepository),
        checkAdminMW(objectRepository),
        getMovieMW(objectRepository),
        deleteMovieMW(objectRepository),
        (req, res, next) => {
            return res.redirect('/movies');
        }
    );
};
