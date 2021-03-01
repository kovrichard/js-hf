/**
 * Delete movie from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Delete movie");
        next();
    }
};
