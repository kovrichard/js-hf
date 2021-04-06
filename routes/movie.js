const renderMW = require('../middleware/generic/render');
const redirectMW = require('../middleware/generic/redirect');
const authMW = require('../middleware/auth/auth');
const getMovieMW = require('../middleware/movie/getMovie');
const getMoviesMW = require('../middleware/movie/getMovies');
const saveMovieMW = require('../middleware/movie/saveMovie');
const deleteMovieMW = require('../middleware/movie/deleteMovie');
const rentMovieMW = require('../middleware/movie/rentMovie');
const unrentMovieMW = require('../middleware/movie/unrentMovie');
const checkAdminMW = require('../middleware/auth/checkAdmin');
const getUserMW = require('../middleware/user/getUser');
const saveUserMW = require('../middleware/user/saveUser');
const auth = require('../middleware/auth/auth');

const UserModel = require('../models/user');
const MovieModel = require('../models/movie');

module.exports = (app) => {
    const objectRepository = {
        UserModel: UserModel,
        MovieModel: MovieModel,
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
        redirectMW(objectRepository, '/')
    );

    app.post('/movie/:movieid/unrent',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getMovieMW(objectRepository),
        unrentMovieMW(objectRepository),
        saveUserMW(objectRepository),
        redirectMW(objectRepository, '/')
    );
};
