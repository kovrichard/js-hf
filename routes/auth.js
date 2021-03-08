var renderMW = require('../middleware/generic/render');
var checkPasswordMW = require('../middleware/auth/checkPassword');
var saveUserMW = require('../middleware/user/saveUser');
var resetUserPassword = require('../middleware/user/resetUserPassword');

userModel = '';

module.exports = (app) => {
    var objectRepository = {
        userModel: userModel
    };

    app.get('/login',
        renderMW(objectRepository, 'login'),
    );

    app.post('/login',
        checkPasswordMW(objectRepository),
        (req, res, next) => {
            return res.redirect('/');
        }
    );

    app.get('/register',
        renderMW(objectRepository, 'register'),
    );

    app.post('/register',
        saveUserMW(objectRepository),
        (req, res, next) => {
            return res.redirect('/');
        }
    );

    app.get('/password-reset',
        renderMW(objectRepository, 'password-reset')
    );

    app.post('/password-reset',
        getUser(objectRepository),
        resetUserPassword(objectRepository),
        (req, res, next) => {
            return res.redirect('/login');
        }
    );
};