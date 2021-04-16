const renderMW = require('../middleware/generic/render');
const redirectMW = require('../middleware/generic/redirect');
const authMW = require('../middleware/auth/auth');
const getUserMW = require('../middleware/user/getUser');
const getUserMoviesMW = require('../middleware/user/getUserMovies');
const deleteUserMW = require('../middleware/user/deleteUser');
const saveUserMW = require('../middleware/user/saveUser');
const logoutMW = require('../middleware/auth/logout');

const UserModel = require('../models/user');
const MovieModel = require('../models/movie');

module.exports = (app) => {
    const objectRepository = {
        UserModel: UserModel,
        MovieModel: MovieModel,
    };

    app.get('/',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getUserMoviesMW(objectRepository),
        renderMW(objectRepository, 'index')
    );

    app.post('/user/:userid/modify',
        authMW(objectRepository),
        getUserMW(objectRepository),
        saveUserMW(objectRepository),
        redirectMW(objectRepository, '/')
    );

    app.get('/user/:userid/delete',
        authMW(objectRepository),
        getUserMW(objectRepository),
        deleteUserMW(objectRepository),
        logoutMW(objectRepository),
        redirectMW(objectRepository, '/login')
    );
};
