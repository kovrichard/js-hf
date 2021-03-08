/**
 * Save user to database, if anything came in req.body, then redirect to /
 * Else call next()
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Saving user...");
        next();
    }
};
