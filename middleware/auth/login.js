/**
 * Destroy session, then redirect to /login
 */
 module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Logging in...")
        res.cookie('userid', res.locals.user._id.toString(), { maxAge: 24 * 60 * 60 * 1000 });
        req.session.loggedin = true;
        return req.session.save((err) => {
            return next();
        });
    };
};
