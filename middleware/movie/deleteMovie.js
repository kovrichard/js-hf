/**
 * Delete movie from database and redirect to /movie
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Deleting movie...");
        return res.redirect('/movie');
    }
};
