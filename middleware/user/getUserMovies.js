/**
 * Load movies rented by user from database based on user id
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const MovieModel = requireOption(objectRepository, 'MovieModel');
    
    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        console.log(`Getting movies rented by user ${res.locals.user.username}`);

        MovieModel.find({ "_id": { "$in": res.locals.user._movies } }, (err, movies) => {
            if (err) {
                return next(err);
            }
            res.locals.usermovies = movies;
            return next();
        });
    }
};
