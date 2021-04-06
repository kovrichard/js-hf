/**
 * Destroy session, then redirect to /login
 */
 module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Logging out...");
        req.session.destroy((err) => {
            res.cookie('userid', "", { maxAge: 0 } );
            return res.redirect('/login');
        });
    };
};
