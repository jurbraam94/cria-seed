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
                    "wachtwoord": "wachtwoord"
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

describe('API Routing for CRUD operations on Algemene gegevens', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Aanvullende gegevens', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Foto', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Muziek', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Notificatie', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Segment', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Uitvaart samenstellen', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Uitvaart', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Wishlist', function () {
    // Hier de Aanvullende gegevens API tests
});