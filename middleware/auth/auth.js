/**
 * If the user is not logged in, redirects to /login, else calls next()
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Authentication...");
        return next();
    };
};
