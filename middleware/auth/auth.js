/**
 * If the user is not logged in, redirects to /login, else calls next()
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Authentication...");
        
        if (typeof req.session.loggedin === 'undefined' || !req.session.loggedin) {
            if (typeof req.cookies !== 'undefined' && typeof req.cookies['userid'] !== 'undefined') {
                res.cookie('userid', "", { maxAge: 0 } );
            }
            return res.redirect('/login');
        }

        if (typeof req.cookies === 'undefined' && typeof req.cookies['userid'] === 'undefined') {
            if (typeof req.session !== 'undefined' && req.sesion.loggedin) {
                req.session.destroy((err) => {
                    return res.redirect('/login');
                });
            }
        }
        return next();
    };
};
