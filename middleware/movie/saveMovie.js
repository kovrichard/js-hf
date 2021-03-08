/**
 * If a movie came in req.body, save it to database (or overwrite if already existed), then redirect to /movies
 * If res.locals has something, use this instead
 * If both are empty, call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Saving movie...");
        next();
    }
};
