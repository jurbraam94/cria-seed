// Load configuration

var env = process.env.NODE_ENV || 'development',
    config = require('../../../server/config/config.js')[env],
    localConfig = require('../../config-test.json')
    ;

var should = require('should'),
    supertest = require('supertest');

describe('API Routing for CRUD operations on Gebruiker', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE gebruiker', function () {
        it('Should POST /gebruiker', function (done) {
            request
                .post('/gebruiker')
                .send({
                    "gebruikersnaam": "Createusertest",
                    "wachtwoord": "Createusertest"
                })
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('Createusertest')
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('wachtwoord')
                        .be.exactly('Createusertest')
                    done();
                });
        });
    });

    describe('RETRIEVE all gebruikers', function () {

        it('Should GET /gebruiker', function (done) {
            request
                .get('/gebruiker')
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    done();
                });
        });
    });

    describe('RETRIEVE 1 gebruiker', function () {
        it('Should GET /gebruiker/{gebruikersnaam}', function (done) {
            request
                .get('/gebruiker/' + 'Createusertest')
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('Createusertest');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('wachtwoord')
                        .be.exactly('Createusertest');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 gebruiker', function () {
        it('Should PUT /gebruiker/{gebruikersnaam}', function (done) {
            request
                .put('/gebruiker/' + 'jur')
                .send({
                    "doc": {
                        "wachtwoord": "wachtwoord"
                    }
                })
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action')
                        .be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err')
                        .be.exactly(null);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('wachtwoord')
                        .be.exactly('wachtwoord');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 gebruiker', function () {
        it('Should DELETE /gebruiker/{gebruikersnaam}', function (done) {
            request
                .del('/gebruiker/' + 'Createusertest')
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('ok')
                        .be.exactly(1);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('n')
                        .be.exactly(1);
                    JSON.parse(res.text).should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

});

describe('API Routing for CRUD operations on Books', function () {

    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    var tmpBookId = null;
    var tmpBookResponse;

    before(function (done) {
        done();
    });

    describe('CREATE book', function () {
        it('Should POST /books', function (done) {
            request
                .post('/books')
                .send({
                    "title": "Great book!" + Date.now(),
                    "author": "John Doe",
                    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
            )
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('create');
                    JSON.parse(res.text)
                        .should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    res.type.should.be.exactly('application/json');
                    res.charset.should.be.exactly('utf-8');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('author')
                        .be.exactly('John Doe');

                    tmpBookId = JSON.parse(res.text).doc._id;

                    done();
                });
        });
    });

    describe('RETRIEVE all books', function () {

        it('Should GET /books', function (done) {
            request
                .get('/books')
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('list');
                    res.statusCode.should.be.exactly(200);

                    tmpBookResponse = res.text;

                    done();
                });
        });
    });

    describe('RETRIEVE 1 book', function () {
        it('Should GET /books/{id}', function (done) {
            request
                .get('/books/' + tmpBookId)
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action')
                        .be.exactly('detail');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('author')
                        .be.exactly('John Doe');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 book', function () {
        it('Should PUT /books/{id}', function (done) {
            request
                .put('/books/' + tmpBookId)
                .send({
                    "doc": {
                        "title": "Good book " + Date.now(),
                        "author": "Ghostwriter",
                        "description": "Book is updated."
                    }
                })
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }

                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action')
                        .be.exactly('update');
                    JSON.parse(res.text)
                        .should.have.property('err')
                        .be.exactly(null);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('author')
                        .be.exactly('Ghostwriter');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 book', function () {
        it('Should DELETE /books/{id}', function (done) {
            request
                .del('/books/' + tmpBookId)
                .expect(200)                                                // supertest
                .expect('Content-Type', /application.json/)                 // supertest
                .expect('Content-Type', 'utf-8')                            // supertest
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('meta')
                        .and.have.property('action').be.exactly('delete');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('ok')
                        .be.exactly(1);
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('n')
                        .be.exactly(1);
                    JSON.parse(res.text).should.have.property('err').be.exactly(null);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

});
