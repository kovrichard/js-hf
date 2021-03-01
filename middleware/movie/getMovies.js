/**
 * Load every movie from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting movies...");
        next();
    }
};
