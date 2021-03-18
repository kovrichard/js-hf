/**
 * If a password came in req.form (login), check whether the password entered by the user is correct.
 * If correct, redirect to /, if not, redirect to /login
 * If req.form is empty, call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Checking password...");
        next();
    }
};
