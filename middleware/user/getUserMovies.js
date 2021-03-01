/**
 * Load movies rented by user from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting movies rented by user...");
        next();
    }
};
