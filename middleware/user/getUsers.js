/**
 * Load every user from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting users...");
        next();
    }
};
