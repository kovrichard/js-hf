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
            },
            (err) => {
                // code does not call next
            }
        );
    });

    
});
