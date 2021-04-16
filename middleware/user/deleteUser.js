/**
 * Delete user from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return next();
        }

        console.log(`Deleting user ${res.locals.user.username}`);
        res.locals.user.remove((err) => {
            if (err) {
                return next(err);
            }
            return next();
        });
    }
};
