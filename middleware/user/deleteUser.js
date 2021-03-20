/**
 * Delete user from database, then redirect to /login
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log(`Deleting user ${res.locals.user.username}`);
        res.redirect('/login');
    }
};
