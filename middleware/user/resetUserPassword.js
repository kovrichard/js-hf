/**
 * Reset user password, if anything came in res.locals and redirect to login
 * Else call next() (we are in a GET request)
 */
 module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Reset password");
        next();
    }
};
