/**
 * Delete user from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log(`Deleting user ${res.locals.user.username}`);
        next();
    }
};
