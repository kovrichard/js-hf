/**
 * Load user by id from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting user...");
        next();
    }
};
