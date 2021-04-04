/**
 * Delete movie from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof res.locals.movie === 'undefined') {
            return next();
        }
        
        res.locals.movie.remove((err) => {
            console.log(`Deleting movie ${res.locals.movie.title}`);
            if (err) {
                return next(err);
            }
            return next();
        });
    }
};
