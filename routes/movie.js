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

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'static/')
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}.${ext(file.originalname)}`)
    }
})
const upload = multer({ storage: storage });

const UserModel = require('../models/user');
const MovieModel = require('../models/movie');

module.exports = (app) => {
    const objectRepository = {
        UserModel: UserModel,
        MovieModel: MovieModel,
    };

    app.get('/movie',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getMoviesMW(objectRepository),
        renderMW(objectRepository, 'movies'),
    );

    app.use('/movie/new', upload.single('image'),
        authMW(objectRepository),
        getUserMW(objectRepository),
        checkAdminMW(objectRepository),
        saveMovieMW(objectRepository),
        renderMW(objectRepository, 'movie-modify'),
    );

    app.get('/movie/:movieid',
        authMW(objectRepository),
        getUserMW(objectRepository),
        getMovieMW(objectRepository),
        renderMW(objectRepository, 'movie'),
    );

    app.use('/movie/:movieid/modify', upload.single('image'),
        authMW(objectRepository),
        getUserMW(objectRepository),
        checkAdminMW(objectRepository),
        getMovieMW(objectRepository),
        saveMovieMW(objectRepository),
        renderMW(objectRepository, 'movie-modify'),
    );

    app.get('/movie/:movieid/delete',
        authMW(objectRepository),
        getUserMW(objectRepository),
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
        redirectMW(objectRepository, '/')
    );
};


function ext(filename) {
    return filename.split('.').pop();
}