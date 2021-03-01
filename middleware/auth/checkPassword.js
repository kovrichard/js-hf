/**
 * Check whether the password entered by the user is correct
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Checking password...");
        next();
    }
};
