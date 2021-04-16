/**
 * Save user to database, if anything came in req.body (register) or res.locals (modify)
 * Else call next() (we are in a GET request)
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const UserModel = requireOption(objectRepository, 'UserModel');
    
    return (req, res, next) => {
        if (req.method == 'GET') {
            console.log('GET request detected, calling next()...');
            return next();
        }

        if (typeof res.locals.user === 'undefined') {
            console.log(`Saving new user ${req.body.username}`);
            res.locals.user = new UserModel();
            UserModel.findOne({username: req.body.username},
                (err, user) => {
                    if (err) {
                        return next(err);
                    } else if (user) {
                        console.log('Username already in use');
                        return res.redirect('/register');
                    } else {
                        res.locals.user.name = req.body.name;
                        res.locals.user.username = req.body.username;
                        res.locals.user.email = req.body.email;
                        console.log(req.body.password);
                        console.log(req.body.passwor2);
                        if (req.body.password != req.body.password2) {
                            console.log('The two passwords must match.')
                            return res.render('register', res.locals);
                        }
                        res.locals.user.password = req.body.password;
                        res.locals.user.isadmin = false;
                        res.locals.user.save((saveErr) => {
                            if (saveErr) {
                                return next(saveErr);
                            }
                            return next();
                        });
                    }
                });
        } else if (typeof res.locals.user !== 'undefined') {
            console.log(`Updating user ${res.locals.user.username}`);
            res.locals.user.name = req.body.name;
            res.locals.user.email = req.body.email;
            res.locals.user.save((err) => {
                if (err) {
                    return next(err);
                }
                return next();
            });
        }
    }
};
