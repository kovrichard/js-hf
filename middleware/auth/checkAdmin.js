/**
 * Check whether current user has admin roles. If not, then stop the middleware chain
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return res.redirect('/');
        }

        console.log("Checking admin rights...");
        if (!res.locals.user.isadmin) {
            console.log(`${res.locals.user.username} is not authorized to access this endpoint`);
            return res.redirect('/');
        }
        console.log('Admin rights okay.')
        return next();
    };
};
