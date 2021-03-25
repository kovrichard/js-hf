/**
 * Get the user from res.user, get the movie from res.movie, decrement its available count by 1,
 * then save it to the user
 */
 module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Renting movie...");
        next();
    }
};
