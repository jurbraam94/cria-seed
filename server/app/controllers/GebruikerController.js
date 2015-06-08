/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Gebruiker = mongoose.model('Gebruiker'),
    crypto = require('crypto'),
    uuid = require('node-uuid'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            XOAuth2: {
                user: "criaprojectgroep7@gmail.com", // Your gmail address.
                                                      // Not @developer.gserviceaccount.com
                clientId: "903231744304-lurk63llpb1lkkcbiq89n252ih7lvj2i.apps.googleusercontent.com",
                clientSecret: "Xjnuy-xO9yF5E8YLthwsKCUT",
                refreshToken: "1/4ZVwpqvPdfllwN4od8BnkHqlbilkzUGorCeQuz1xc4A"
            }
        }
    });

var hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};


exports.sendMail = function (req, res) {
    var mailOptions = {
        from: req.body.naam + " <" + req.body.email + ">", // sender address
        to: 'criaprojectgroep7@gmail.com', // list of receivers
        subject: 'DOOD Contactformulier', // Subject line
        text: "Bericht van " + req.body.email + ": " + req.body.bericht, // plaintext body
        html: "Bericht van " + req.body.email + ": " + req.body.bericht // html body
    }, retObj;

    if (req.body.naam !== null && req.body.email !== null && req.body.bericht !== null) {
     // send mail with defined transport object
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                retObj = {
                    meta: {
                        "action": "mail",
                        'timestamp': new Date(),
                        filename: __filename
                    },
                    err: error
                };

                return res.send(retObj);
            }
            retObj = {
                meta: {
                    "action": "mail",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: {naam: req.body.naam, email: req.body.email, bericht: req.body.bericht},
                err: null
            };

            return res.send(retObj);
        });
    } else {
        retObj = {
            meta: {
                "action": "mail",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: {},
            err: "Vul alstublieft alle gegevens in"
        };

        return res.send(retObj);
    }


};

exports.login = function (req, res) {
    var conditions = { "gebruikersnaam" : { $regex : new RegExp(req.body.gebruikersnaam, "i") } }, fields = {},
        retObj;
    Gebruiker.findOne(conditions, fields, function (err, gebruiker) {
        if (err) {
            retObj = {
                meta: {
                    "action": "detail",
                    'timestamp': new Date(),
                    filename: __filename
                },
                err: err
            };
            return res.send(retObj);
        }

        if (gebruiker) {
            hashPassword(req.body.wachtwoord, gebruiker.passwordSalt, function (err, passwordHash) {
                if (gebruiker.passwordHash === passwordHash.toString()) {
                    req.session.gebruiker = gebruiker.gebruikersnaam;
                    retObj = {
                        meta: {
                            "action": "login",
                            'timestamp': new Date(),
                            filename: __filename
                        },
                        doc: {
                            "gebruikersnaam": req.session.gebruiker
                        }, // only the first document, not an array when using "findOne"
                        err: err
                    };
                    return res.send(retObj);
                }
                retObj = {
                    meta: {
                        "action": "login",
                        'timestamp': new Date(),
                        filename: __filename
                    },
                    err: "Wachtwoord onjuist"
                };
                return res.send(retObj);
            });
        } else {
            retObj = {
                meta: {
                    "action": "detail",
                    'timestamp': new Date(),
                    filename: __filename
                },
                err: "Gebruiker niet gevonden"
            };
            return res.send(retObj);
        }
    });
};

exports.loguit = function (req, res) {
    var retObj, gebruiker;
    if (req.session.gebruiker) {
        gebruiker = req.session.gebruiker;
        delete req.session.gebruiker;
        retObj = {
            meta: {
                "action": "loguit",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: "Gebruiker " + gebruiker + " is uitgelogd.", // only the first document, not an array when using "findOne"
            err: {}
        };
        return res.send(retObj);
    }
    retObj = {
        meta: {
            "action": "loguit",
            'timestamp': new Date(),
            filename: __filename
        },
        doc: {}, // only the first document, not an array when using "findOne"
        err: "Er is geen gebruiker ingelogd of de sessie is al verlopen."
    };
    return res.send(retObj);
};

exports.session = function (req, res) {
    var retObj, gebruiker;
    gebruiker = req.session.gebruiker;

    if (req.session.gebruiker) {
        retObj = {
            meta: {
                "action": "session",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: {
                "gebruikersnaam": gebruiker
            }, // only the first document, not an array when using "findOne"
            err: {}
        };
        return res.send(retObj);
    }
    retObj = {
        meta: {
            "action": "session",
            'timestamp': new Date(),
            filename: __filename
        },
        doc: {}, // only the first document, not an array when using "findOne"
        err: "Er is geen gebruiker ingelogd of de sessie is verlopen."
    };
    return res.send(retObj);
};



exports.gebruikerAanmaken = function (req, res) {
    var salt = uuid.v4(),
        doc;

    hashPassword(req.body.wachtwoord, salt, function (err, passwordHash) {
        doc = new Gebruiker({gebruikersnaam: req.body.gebruikersnaam, passwordHash: passwordHash.toString(), passwordSalt: salt});
        doc.save(function (err) {
            var retObj = {
                meta: {
                    "action": "create",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc,
                err: err
            };

            return res.send(retObj);
        });
    });



};

/**
 * delete function
 * @param req
 * @param res
 */
exports.gebruikerVerwijderen = function (req, res) {
    var conditions, callback, retObj;

    conditions = {gebruikersnaam: req.params._gebruikersnaam};

    callback = function (err, doc) {
        retObj = {
            meta: {
                "action": "delete",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: doc,
            err: err
        };
        return res.send(retObj);
    };
    Gebruiker.remove(conditions, callback);
};
