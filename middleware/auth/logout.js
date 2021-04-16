/**
 * Destroy session, then redirect to /login
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof req.session === 'undefined') {
            return res.redirect('/login');
        }

        console.log("Logging out...");
        req.session.destroy((err) => {
            if (err) {
                return next(err);
            }
            res.cookie('userid', "", { maxAge: 0 } );
            return res.redirect('/login');
        });
    };
};
