/**
 * Load movie by id from database
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        console.log("Getting movie...");
        res.locals.movie = getMovieMock();
        next();
    }
};

// This will be deleted, once database is implemented
function getMovieMock() {
    return {
        id: 1,
        title: 'The Shawshank Redemption',
        directedby: 'Frank Darabont',
        year: 1994,
        category: 'Drama',
        cast: [
            'Tim Robbins',
            'Morgan Freeman',
            'Bob Gunton',
            'William Sadler'
        ],
        image: '/static/the_shawshank_redemption.jpg',
        available: 3,
    }
}
