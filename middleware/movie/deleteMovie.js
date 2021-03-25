/**
 * Delete movie from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log(`Deleting movie ${res.locals.movie.title}`);
        next();
    }
};
