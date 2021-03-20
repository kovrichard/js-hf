/**
 * Load movies rented by user from database based on user id
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting movies rented by user...");
        res.locals.usermovies = userMoviesMock();
        next();
    }
};

// This will be deleted, once database is implemented
function userMoviesMock() {
    return [
        {
            id: 2,
            title: 'Avengers',
        },
        {
            id: 1,
            title: 'The Shawshank Redemption',
        }
    ]
}
