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
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE Algemene gegevens', function () {
        it('Should POST /algemeneGegevens', function (done) {
            request
                .post('/algemeneGegevens')
                .send({
                    "gebruikersnaam": "test",
                    "voornaam": "jur",
                    "achternaam": "braam",
                    "woonplaats": "oosterhout",
                    "postcode": "6678AX",
                    "adres": "Dijkstraat",
                    "huisnummer": "20",
                    "telefoon": "0610524507",
                    "email": "jur_braam@hotmail.com"
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
                        .be.exactly('test')
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('adres')
                        .be.exactly('Dijkstraat')
                    done();
                });
        });
    });

    describe('RETRIEVE 1 algemeneGegevens', function () {
        it('Should GET /algemeneGegevens/{gebruikersnaam}', function (done) {
            request
                .get('/algemeneGegevens/' + 'jur')
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('huisnummer')
                        .be.exactly(20);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 gebruiker', function () {
        it('Should PUT /algemeneGegevens/{gebruikersnaam}', function (done) {
            request
                .put('/algemeneGegevens/' + 'jur')
                .send({
                    "voornaam": "jur",
                    "achternaam": "braam",
                    "woonplaats": "Dodewaard",
                    "postcode": "6696GS",
                    "adres": "Jasappel",
                    "huisnummer": "1",
                    "telefoon": "0610524507",
                    "email": "jur_braam@hotmail.com"
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
                        .and.have.property('woonplaats')
                        .be.exactly('Dodewaard');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });
});

describe('API Routing for CRUD operations on Aanvullende gegevens', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE Aanvullende gegevens', function () {
        it('Should POST /aanvullendeGegevens', function (done) {
            request
                .post('/aanvullendeGegevens')
                .send({
                    "gebruikersnaam": "test",
                    "religie": "Christelijk",
                    "donor": "Ja"
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
                        .be.exactly('test')
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('donor')
                        .be.exactly('Ja')
                    done();
                });
        });
    });

    describe('RETRIEVE 1 Aanvullende gegevens', function () {
        it('Should GET /aanvullendeGegevens/{gebruikersnaam}', function (done) {
            request
                .get('/aanvullendeGegevens/' + 'jur')
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('religie')
                        .be.exactly('Christelijk');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 Aanvullende gegevens', function () {
        it('Should PUT /aanvullendeGegevens/{gebruikersnaam}', function (done) {
            request
                .put('/aanvullendeGegevens/' + 'jur')
                .send({
                    "religie": "Joods",
                    "donor": "Nee"
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
                        .and.have.property('religie')
                        .be.exactly('Joods');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });
});

describe('API Routing for CRUD operations on Foto', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE Foto', function () {
        it('Should POST /foto', function (done) {
            request
                .post('/foto')
                .send({
                    "gebruikersnaam": "Createusertest",
                    "bestandsnaam": "testfoto.JPG",
                    "volgnummer": 1337
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
                        .and.have.property('volgnummer')
                        .be.exactly(1337)
                    done();
                });
        });
    });

    describe('RETRIEVE all Fotos for a user', function () {

        it('Should GET ALL /foto/{gebruikersnaam}', function (done) {
            request
                .get('/foto/' + 'jur')
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

    describe('RETRIEVE 1 Foto of a user', function () {
        it('Should GET /foto/{gebruikersnaam}/{volgnummer}', function (done) {
            request
                .get('/foto/' + 'jur/' + 1)
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('volgnummer')
                        .be.exactly(1);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 Foto of a user', function () {
        it('Should DELETE /foto/{gebruikersnaam}/{volgnummer}', function (done) {
            request
                .del('/foto/' + 'Createusertest/' + 1337)
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

describe('API Routing for CRUD operations on Muziek', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE music playlist', function () {
        it('Should POST /muziek', function (done) {
            request
                .post('/muziek')
                .send({
                    "gebruikersnaam": "Createusertest",
                    "playlistId": 1337
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
                        .and.have.property('playlistId')
                        .be.exactly(1337)
                    done();
                });
        });
    });

    describe('RETRIEVE playlist of a user', function () {
        it('Should GET /muziek/{gebruikersnaam}', function (done) {
            request
                .get('/muziek/' + 'jur')
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('playlistId')
                        .be.exactly(3);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });
});

describe('API Routing for CRUD operations on Notificatie', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE Notificatie', function () {
        it('Should POST /notificatie', function (done) {
            request
                .post('/notificatie')
                .send({
                    "gebruikersnaam": "Createusertest",
                    "email": "Createusertest",
                    "naam" : "jur",
                    "bericht" :"boodschap" ,
                    "volgnummer" : 1337
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
                        .and.have.property('bericht')
                        .be.exactly('boodschap')
                    done();
                });
        });
    });

    describe('RETRIEVE all notificatie', function () {

        it('Should GET all /notificatie', function (done) {
            request
                .get('/notificatie/' + 'jur')
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

    describe('RETRIEVE 1 notificatie', function () {
        it('Should GET /notificatie/{gebruikersnaam}', function (done) {
            request
                .get('/notificatie/' + 'jur/' + 1)
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('bericht')
                        .be.exactly('hoi');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 notificatie', function () {
        it('Should PUT /notificatie/{gebruikersnaam}', function (done) {
            request
                .put('/notificatie/' + 'jur/' + 1)
                .send({
                    "email": "jur_braam@hotmail.com",
                    "naam" : "jur",
                    "bericht" :"niks"
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
                        .and.have.property('bericht')
                        .be.exactly('niks');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 notificatie', function () {
        it('Should DELETE /notificatie/{gebruikersnaam}', function (done) {
            request
                .del('/notificatie/' + 'Createusertest/' + 1337)
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

describe('API Routing for CRUD operations on Segment', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE Segment', function () {
        it('Should POST /segment', function (done) {
            request
                .post('/segment')
                .send({
                    "gebruikersnaam": "Createusertest",
                    "object": "video",
                    "percentage" : "10",
                    "volgnummer" : 1337
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
                        .and.have.property('percentage')
                        .be.exactly('10')
                    done();
                });
        });
    });

    describe('RETRIEVE all Segment', function () {

        it('Should GET all /segment', function (done) {
            request
                .get('/segment/' + 'jur')
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

    describe('RETRIEVE 1 Segment', function () {
        it('Should GET /segment/{gebruikersnaam}', function (done) {
            request
                .get('/segment/' + 'jur/' + 2)
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('percentage')
                        .be.exactly('80');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 Segment', function () {
        it('Should PUT /segment/{gebruikersnaam}/{volgnummer}', function (done) {
            request
                .put('/segment/' + 'jur/' + 1)
                .send({
                    "object": "video",
                    "percentage" : "30"
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
                        .and.have.property('percentage')
                        .be.exactly('30');
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('DELETE 1 Segment', function () {
        it('Should DELETE /segment/{gebruikersnaam}/{volgnummer}', function (done) {
            request
                .del('/segment/' + 'Createusertest/' + 1337)
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

describe('API Routing for CRUD operations on Uitvaart samenstellen', function () {
    var request = supertest(localConfig.host + ":" + config.port + "/" + localConfig.api_path);

    before(function (done) {
        done();
    });

    describe('CREATE Uitvaart samenstellen', function () {
        it('Should POST /segment', function (done) {
            request
                .post('/segment')
                .send({
                    "gebruikersnaam": "Createusertest",
                    "tijdsduur" : 40
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
                        .and.have.property('tijdsduur')
                        .be.exactly(40)
                    done();
                });
        });
    });

    describe('RETRIEVE 1 Segment', function () {
        it('Should GET /segment/{gebruikersnaam}', function (done) {
            request
                .get('/segment/' + 'jur')
                .expect('Content-Type', /application.json/)
                .expect(200)
                .end(function (err, res) {
                    if (err) {
                        throw err;
                    }
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('gebruikersnaam')
                        .be.exactly('jur');
                    JSON.parse(res.text)
                        .should.have.property('doc')
                        .and.have.property('tijdsduur')
                        .be.exactly(60);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });

    describe('UPDATE 1 Uitvaart samenstellen', function () {
        it('Should PUT /segment/{gebruikersnaam}', function (done) {
            request
                .put('/segment/' + 'jur')
                .send({
                    "tijdsduur" : 30
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
                        .and.have.property('tijdsduur')
                        .be.exactly(30);
                    res.statusCode.should.be.exactly(200);
                    done();
                });
        });
    });
});

describe('API Routing for CRUD operations on Uitvaart', function () {
    // Hier de Aanvullende gegevens API tests
});

describe('API Routing for CRUD operations on Wishlist', function () {
    // Hier de Aanvullende gegevens API tests
});