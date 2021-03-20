/**
 * Save user to database, if anything came in req.body (register) or res.locals (modify), then redirect to /
 * Else call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (req.method == 'GET') {
            console.log('GET request detected, calling next()...');
            return next();
        }

        console.log("Saving user...");
        res.redirect('/');
    }
};
