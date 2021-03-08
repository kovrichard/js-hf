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
        (req, res, next) => {
            return res.redirect('/movies');
        }
    );
};
