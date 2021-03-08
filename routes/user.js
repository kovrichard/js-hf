var renderMW = require('../middleware/generic/render');
var authMW = require('../middleware/auth/auth');
var getUserMW = require('../middleware/user/getUser');
var getUserMoviesMW = require('../middleware/user/getUserMovies');
var deleteUserMW = require('../middleware/user/deleteUser');
var saveUserMW = require('../middleware/user/saveUser');

userModel = '';

module.exports = (app) => {
    var objectRepository = {
        userModel: userModel
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
        saveUserMW(objectRepository)
    );

    app.get('/user/:userid/delete',
        authMW(objectRepository),
        getUserMW(objectRepository),
        deleteUserMW(objectRepository)
    );
};
