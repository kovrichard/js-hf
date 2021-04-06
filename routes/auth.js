const renderMW = require('../middleware/generic/render');
const redirectMW = require('../middleware/generic/redirect');
const checkPasswordMW = require('../middleware/auth/checkPassword');
const getUserMW = require('../middleware/user/getUser');
const saveUserMW = require('../middleware/user/saveUser');
const resetUserPassword = require('../middleware/user/resetUserPassword');
const logoutMW = require('../middleware/auth/logout');

const UserModel = require('../models/user');
const MovieModel = require('../models/movie');

module.exports = (app) => {
    const objectRepository = {
        UserModel: UserModel,
        MovieModel: MovieModel,
    };

    app.use('/login',
        checkPasswordMW(objectRepository),
        renderMW(objectRepository, 'login'),
    );

    app.get('/register',
        renderMW(objectRepository, 'register'),
    );

    app.post('/register',
        saveUserMW(objectRepository),
        redirectMW(objectRepository, '/login'),
    );

    app.get('/password-reset',
        renderMW(objectRepository, 'password-reset')
    );

    app.post('/password-reset',
        getUserMW(objectRepository),
        resetUserPassword(objectRepository),
        redirectMW(objectRepository, '/login')
    );

    app.get('/logout',
        logoutMW(objectRepository),
        redirectMW(objectRepository, '/login'),
    );
};
