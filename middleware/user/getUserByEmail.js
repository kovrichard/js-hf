/**
 * Load user by email from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting user by email...");
        next();
    }
};
