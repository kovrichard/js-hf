var renderMW = require('../middleware/generic/render');
var redirectMW = require('../middleware/generic/redirect');
var checkPasswordMW = require('../middleware/auth/checkPassword');
var getUserMW = require('../middleware/user/getUser');
var saveUserMW = require('../middleware/user/saveUser');
var resetUserPassword = require('../middleware/user/resetUserPassword');

userModel = '';

module.exports = (app) => {
    var objectRepository = {
        userModel: userModel
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
        redirectMW(objectRepository, '/')
    );

    app.get('/password-reset',
        renderMW(objectRepository, 'password-reset')
    );

    app.post('/password-reset',
        getUserMW(objectRepository),
        resetUserPassword(objectRepository),
        redirectMW(objectRepository, '/login')
    );
};