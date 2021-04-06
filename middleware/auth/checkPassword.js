const { request } = require("express");

/**
 * If a password came in req.form (login), check whether the password entered by the user is correct.
 * If correct, redirect to /, if not, redirect to /login
 * If req.form is empty, call next() (we are in a GET request)
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const UserModel = requireOption(objectRepository, 'UserModel');
    
    return (req, res, next) => {
        if (typeof res.locals.user === 'undefined') {
            return res.redirect('/login');
        }

        console.log(`Checking password for user ${res.locals.user.username}`);
        UserModel.findOne({ username: res.locals.user.username },
            (err, user) => {
                if (err || !user) {
                    return next(err);
                }

                if (req.body.password !== user.password) {
                    console.log("Password is wrong");
                    res.redirect('/login');
                } else {
                    console.log('Username and password OK, logging in...');
                    res.cookie('userid', user._id.toString(), { maxAge: 24 * 60 * 60 * 1000 });
                    // req.session.loggedin = true;
                    // return req.session.save((err) => {
                    // return res.redirect('/');
                    return next();
                }
            });
    }
};
