const crypto = require('crypto');

/**
 * Reset user password, if anything came in res.locals
 * Else call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return res.redirect('/password-reset');
        }

        console.log(`Reseting password for user ${res.locals.user.username}`);
        const passwd = crypto.randomBytes(10).toString('hex');
        res.locals.user.password = passwd;
        res.locals.user.save((err) => {
            if (err) {
                return next(err);
            }
            console.log(`New password is ${passwd}`);
            return next();
        });
    }
};
