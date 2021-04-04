/**
 * Load movie by id from database
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const MovieModel = requireOption(objectRepository, 'MovieModel');

    return (req, res, next) => {
        console.log("Getting movie...");

        MovieModel.findOne({_id: req.params.movieid},
            (err, movie) => {
            if (err || !movie) {
                return next(err);
            }

            res.locals.movie = movie;
            return next();
        });
    }
};
