/**
 * Get the user from res.user, get the movie from res.movie, increment its available count by 1,
 * then remove it from user
 */
 module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Unrenting movie...");
        next();
    }
};
