/**
 * Load user by some identifier (id, username, email) from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting user...");
        res.locals.user = getUserMock();
        next();
    }
};

// This will be deleted, once database is implemented
function getUserMock() {
    return {
        id: 1,
        username: 'admin',
        name: 'Admin Admin',
        email: 'admin@admin.com',
    }
}
