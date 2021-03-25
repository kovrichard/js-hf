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

    app.use('/register',
        saveUserMW(objectRepository),
        renderMW(objectRepository, 'register'),
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