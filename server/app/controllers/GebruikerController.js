/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Gebruiker = mongoose.model('Gebruiker'),
    crypto = require('crypto'),
    uuid = require('node-uuid');

var hashPassword = function (password, salt, callback) {
    // We use pbkdf2 to hash and iterate 10k times by default
    var iterations = 10000,
        keyLen = 64; // 64 bit.
    crypto.pbkdf2(password, salt, iterations, keyLen, callback);
};

exports.login = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {},
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
            hashPassword(req.params._wachtwoord, gebruiker.passwordSalt, function (err, passwordHash) {
                if (gebruiker.passwordHash === passwordHash.toString()) {
                    retObj = {
                        meta: {
                            "action": "detail",
                            'timestamp': new Date(),
                            filename: __filename
                        },
                        doc: {
                            "gebruikersnaam": gebruiker.gebruikersnaam
                        }, // only the first document, not an array when using "findOne"
                        err: err
                    };
                    return res.send(retObj);
                }
                retObj = {
                    meta: {
                        "action": "detail",
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
