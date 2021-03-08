/**
 * Check whether the password entered by the user is correct, if a password came in req.form,
 * then redirect to /
 * Else call next()
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Checking password...");
        next();
    }
};
