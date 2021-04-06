/**
 * Get the user from res.user, get the movie from res.movie, increment its available count by 1,
 * then remove it from user
 */
module.exports = (objectRepository) => {
    return (req, res, next) => {
        if (typeof res.locals.movie === 'undefined' || typeof res.locals.user === 'undefined') {
            return res.redirect('/');
        }
        console.log(`Unrenting movie ${res.locals.movie.title}`);

        res.locals.user._movies = res.locals.user._movies.filter(movie => movie != res.locals.movie.id);
        res.locals.movie.available++;
        res.locals.user.save((err) => {
            if (err) {
                return next(err);
            }
            res.locals.movie.save((saveMovieErr) => {
                if (saveMovieErr) {
                    return next(saveMovieErr);
                }
                console.log(`${res.locals.movie.title} was given back to the library.`);
                return next();
            });
        });
        return next();
    }
};
