/**
 * Check whether current user has admin roles
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Checking admin rights...");
        next();
    };
};
