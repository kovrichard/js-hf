/**
 * Load user by username from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting user by username...");
        next();
    }
};
