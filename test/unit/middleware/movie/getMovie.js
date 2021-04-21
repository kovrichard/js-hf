var expect = require('chai').expect;
var getMovieMW = require('../../../../middleware/movie/getMovie');

describe('getMovie middleware ', () => {
    it('should set res.locals.movie to a movie object from db', (done) => {
        const mw = getMovieMW({
            MovieModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 42 });
                    cb(null, 'mockMovie');
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {
                params: {
                    movieid: 42
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({ movie: 'mockMovie' });
                done();
            }
        );
    });

    it('should call next with error on a db problem', (done) => {
        const mw = getMovieMW({
            MovieModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 42 });
                    cb('dberror', null);
                }
            }
        });

        mw(
            {
                params: {
                    movieid: 42
                }
            },
            {},
            (err) => {
                expect(err).to.be.eql('dberror');
                done();
            }
        );
    });

    it('should call next with error on missing movie object', (done) => {
        const mw = getMovieMW({
            MovieModel: {
                findOne: (p1, cb) => {
                    expect(p1).to.be.eql({ _id: 42 });
                    cb(undefined, null);
                }
            }
        });

        const resMock = {
            locals: {}
        };

        mw(
            {
                params: {
                    movieid: 42
                }
            },
            resMock,
            (err) => {
                expect(err).to.be.eql(undefined);
                expect(resMock.locals).to.be.eql({});
                done();
            }
        );
    });
});
