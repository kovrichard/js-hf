/**
 * Delete user from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Delete user");
        next();
    }
};
