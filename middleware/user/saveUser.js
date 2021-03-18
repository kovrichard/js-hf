/**
 * Save user to database, if anything came in req.body (register) or res.locals (modify), then redirect to /
 * Else call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Saving user...");
        next();
    }
};
