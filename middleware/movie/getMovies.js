/**
 * Load every movie from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting movies...");
        res.locals.movies = getMoviesMock();
        next();
    }
};

// This will be deleted, once database is implemented
function getMoviesMock() {
    return [
        {
            id: 1,
            title: 'The Shawshank Redemption',
            directedby: 'Frank Darabont',
            year: 1994,
            category: 'Drama',
            available: 3,
        },
        {
            id: 2,
            title: 'Avengers',
            directedby: 'Joss Whedon',
            year: 2012,
            category: 'Superhero',
            available: 2,
        },
        {
            id: 3,
            title: 'The Godfather',
            directedby: 'Francis Ford Coppola',
            year: 1972,
            category: 'Crime',
            available: 1,
        },
    ]
}