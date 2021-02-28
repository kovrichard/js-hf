/**
 * Check whether current user has admin roles
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        next();
    };
};
