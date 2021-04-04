/**
 * Load every movie from database
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const MovieModel = requireOption(objectRepository, 'MovieModel');

    return (req, res, next) => {
        console.log("Getting movies...");
        MovieModel.find({}, (err, movies) => {
            if (err) {
                return next(err);
            }

            res.locals.movies = movies;
            return next();
        });
    }
};
