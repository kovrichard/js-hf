/**
 * Reset user password, if anything came in res.locals
 * Else call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log(`Reseting password for user ${res.locals.user.username}`);
        console.log('New password is admin');
        next();
    }
};
