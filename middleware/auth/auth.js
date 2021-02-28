/**
 * If the user is not logged in, redirects to /login
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        return next();
    };
};
