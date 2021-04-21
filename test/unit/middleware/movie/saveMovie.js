var expect = require('chai').expect;
var saveMovieMW = require('../../../../middleware/movie/saveMovie');

describe('saveMovie middleware ', () => {
    it('should redirect to /movie when everything is okay', (done) => {
        const mw = saveMovieMW({
            MovieModel: 'movie'
        });

        mw(
            {
                body: {
                    title: 'Movie 1',
                    directedby: 'Director',
                    year: 2001,
                    category: 'Drama',
                    cast: 'First,Second,Third',
                    available: 4
                }
            },
            {
                locals: {
                    movie: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                redirect: (where) => {
                    expect(where).to.be.eql('/movie');
                    done();
                }
            }
        );
    });

    it('should call next with error on a db problem', (done) => {
        const mw = saveMovieMW({
            MovieModel: 'movie'
        });

        mw(
            {
                body: {
                    title: 'Movie 1',
                    directedby: 'Director',
                    year: 2001,
                    category: 'Drama',
                    cast: 'First,Second,Third',
                    available: 4
                }
            },
            {
                locals: {
                    movie: {
                        save: (cb) => {
                            cb('dberror');
                        }
                    }
                }
            },
            (err) => {
                expect(err).to.be.eql('dberror');
                done();
            }
        );
    });

    it('should save image path to movie on image upload', (done) => {
        const mw = saveMovieMW({
            MovieModel: 'movie'
        });

        var movieMock = {
            save: (cb) => {
                cb(null);
            }
        }

        mw(
            {
                body: {
                    title: 'Movie 1',
                    directedby: 'Director',
                    year: 2001,
                    category: 'Drama',
                    cast: 'First,Second,Third',
                    available: 4
                },
                file: {
                    path: 'static/testimage.jpg'
                }
            },
            {
                locals: {
                    movie: movieMock
                },
                redirect: (where) => {
                    expect(movieMock.image).to.be.eql('/static/testimage.jpg');
                    done();
                }
            }
        );
    });

    it('should render movie-modify on non-numeric year input', (done) => {
        const mw = saveMovieMW({
            MovieModel: 'movie'
        });

        mw(
            {
                body: {
                    title: 'Movie 1',
                    directedby: 'Director',
                    year: 'wrong-year-format',
                    category: 'Drama',
                    cast: 'First,Second,Third',
                    available: 4
                }
            },
            {
                locals: {
                    movie: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                render: (what, locals) => {
                    expect(what).to.be.eql('movie-modify');
                    expect(locals.movie.title).to.be.eql('Movie 1');
                    expect(locals.movie.directedby).to.be.eql('Director');
                    expect(locals.movie.category).to.be.eql('Drama');
                    expect(locals.movie.available).to.be.eql(4);
                    done();
                }
            }
        );
    });

    it('should render movie-modify on non-numeric available count input', (done) => {
        const mw = saveMovieMW({
            MovieModel: 'movie'
        });

        mw(
            {
                body: {
                    title: 'Movie 1',
                    directedby: 'Director',
                    year: 2001,
                    category: 'Drama',
                    cast: 'First,Second,Third',
                    available: 'four'
                }
            },
            {
                locals: {
                    movie: {
                        save: (cb) => {
                            cb(null);
                        }
                    }
                },
                render: (what, locals) => {
                    expect(what).to.be.eql('movie-modify');
                    expect(locals.movie.title).to.be.eql('Movie 1');
                    expect(locals.movie.directedby).to.be.eql('Director');
                    expect(locals.movie.year).to.be.eql(2001);
                    expect(locals.movie.category).to.be.eql('Drama');
                    done();
                }
            }
        );
    });
});
