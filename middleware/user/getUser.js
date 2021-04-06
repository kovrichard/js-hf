/**
 * Load user by some identifier (id, username, email) from database
 */
const requireOption = require('../generic/requireOption');

module.exports = (objectRepository) => {
    const UserModel = requireOption(objectRepository, 'UserModel');

    return (req, res, next) => {
        if (typeof req.cookies !== 'undefined' && typeof req.cookies['userid'] !== 'undefined') {
            return getUserByKey(res, next, UserModel, '_id', req.cookies['userid']);
        } else if (typeof req.body.username !== 'undefined' && req.body.username !== '') {
            return getUserByKey(res, next, UserModel, 'username', req.body.username);
        } else if (typeof req.body.email !== 'undefined' && req.body.email !== '') {
            return getUserByKey(res, next, UserModel, 'email', req.body.email);
        } else {
            return getUserByKey(res.next, UserModel, '_id', req.params.userid);
        }
    }
};

function getUserByKey(res, next, UserModel, key, value) {
    query = {};
    query[key] = value;
    console.log(`Getting user by ${key}...`);
    UserModel.findOne(query,
        (err, user) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            console.log('User not found...');
            return next();
        }
        res.locals.user = user;
        return next();
    });
}
