/**
 * Get the user from res.user, get the movie from res.movie, decrement its available count by 1,
 * then save it to the user
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof res.locals.movie === 'undefined' || typeof res.locals.user === 'undefined') {
            return res.redirect('/movie');
        }
        console.log(`Renting movie ${res.locals.movie.title}`);

        if (0 < res.locals.movie.available && !res.locals.user._movies.includes(res.locals.movie._id)) {
            res.locals.user._movies.push(res.locals.movie);
            res.locals.movie.available--;
            res.locals.user.save((err) => {
                if (err) {
                    return next(err);
                }
                res.locals.movie.save((saveMovieErr) => {
                    if (saveMovieErr) {
                        return next(saveMovieErr);
                    }
                    console.log(`${res.locals.movie.available} copies left to rent from movie ${res.locals.movie.title}.`);
                    return next();
                });
            });
        }
        return next();
    }
};
