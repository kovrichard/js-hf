/**
 * Save user to database, if anything came in req.body (register) or res.locals (modify)
 * Else call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (req.method == 'GET') {
            console.log('GET request detected, calling next()...');
            return next();
        }

        if (typeof req.body.username !== 'undefined') {
            console.log(`Saving new user ${req.body.username}`);
        } else if (typeof res.locals.user !== 'undefined') {
            console.log(`Updating user ${res.locals.user.username}`);
        }

        next();
    }
};
