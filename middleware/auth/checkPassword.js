/**
 * If a password came in req.form (login), check whether the password entered by the user is correct.
 * If correct, redirect to /, if not, redirect to /login
 * If req.form is empty, call next() (we are in a GET request)
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof req.body.username === 'undefined') {
            console.log("GET request detected, calling next()...");
        } else {
            console.log(`Checking password for user ${req.body.username}`);

            if (req.body.username == 'admin' && req.body.password == 'admin') {
                console.log('Username and password OK, logging in...');
                return res.redirect('/');
            } else {
                console.log('Username or password is wrong.');
                return res.redirect('/login');
            }
        }
        next();
    }
};
