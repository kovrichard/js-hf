/**
 * If a movie came in req.body (new), save it to database (or overwrite if already existed), then redirect to /movie
 * If res.locals has something, use this instead (modify)
 * If both are empty, call next() (we are in a GET request)
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const MovieModel = requireOption(objectRepository, 'MovieModel');

    return (req, res, next) => {
        if (req.method == 'GET') {
            console.log("GET request detected, calling next()...");
            return next();
        }

        if (typeof res.locals.movie === 'undefined') {
            console.log("Creating movie...");
            res.locals.movie = new MovieModel();
        } else {
            console.log("Updating movie...");
        }
        
        res.locals.movie.title = req.body.title;
        res.locals.movie.directedby = req.body.directedby;
        res.locals.movie.year = req.body.year;
        res.locals.movie.category = req.body.category;
        res.locals.movie.cast = parseCast(req.body.cast);
        res.locals.movie.available = req.body.available;
        if (typeof req.file !== 'undefined') {
            res.locals.movie.image = `/${req.file.path}`;
        }

        res.locals.movie.save((err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/movie');
        });
    }
};

function parseCast(cast) {
    let tmp = cast.split(/[,\r\n]/);
    tmp = tmp.filter(actor => actor != '');
    return tmp;
}
