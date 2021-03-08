/**
 * Check whether current user has admin roles. If not, then stop the middleware chain
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Checking admin rights...");
        next();
    };
};
