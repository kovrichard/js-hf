var renderMW = require('../middleware/generic/render');
var checkPasswordMW = require('../middleware/auth/checkPassword');
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
        getUser(objectRepository),
        resetUserPassword(objectRepository),
        renderMW(objectRepository, 'password-reset')
    );
};