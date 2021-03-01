/**
 * Save movie to database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Saving movie...");
        next();
    }
};
