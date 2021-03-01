/**
 * Save user to database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Saving user...");
        next();
    }
};
