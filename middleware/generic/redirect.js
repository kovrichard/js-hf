/**
 * Redirect to the given endpoint
 */
 module.exports = (objectRepository, endpoint) => {
    return (req, res) => {
        console.log(`Redirecting to ${endpoint}`);
        res.redirect(endpoint);
    };
};
