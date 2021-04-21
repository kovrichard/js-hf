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
                },
                params: {
                    movieid: 42
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
            },
            (err) => {
                // code does not call next
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
                },
                params: {
                    movieid: 42
                }
            },
            {
                locals: {
                    movie: {
                        save: (cb) => {
                            cb('dberror');
                        }
                    }
                },
                redirect: (where) => {
                    // code does not reach this part
                }
            },
            (err) => {
                expect(err).to.be.eql('dberror');
                done();
            }
        );
    });
});
