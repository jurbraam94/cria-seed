/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Gebruiker = mongoose.model('Gebruiker');

/**
 * create function
 * @param req
 * @param res
 */

exports.login = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam, wachtwoord: req.params._wachtwoord}, fields = {password: 0};

    Gebruiker.findOne(conditions, fields)
        .exec(function (err, doc) {
            var retObj = {
                meta: {
                    "action": "detail",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc, // only the first document, not an array when using "findOne"
                err: err
            };
            return res.send(retObj);
        });
};


exports.gebruikerAanmaken = function (req, res) {
    var doc = new Gebruiker(req.body);

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
};

/**
 * retrieve all function
 * @param req
 * @param res
 */
exports.alleGebruikers = function (req, res) {
    var conditions = {}, fields = {}, sort = {'modificationDate': -1};

    Gebruiker.find(conditions, fields)
        .sort(sort)
        .exec(function (err, doc) {

            var retObj = {
                meta: {
                    "action": "list",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc, // array
                err: err
            };

            return res.send(retObj);
        });
};

/**
 * retrieve one function
 * @param req
 * @param res
 */
exports.gebruikerDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    Gebruiker.findOne(conditions, fields)
        .exec(function (err, doc) {
            var retObj = {
                meta: {
                    "action": "detail",
                    'timestamp': new Date(),
                    filename: __filename
                },
                doc: doc, // only the first document, not an array when using "findOne"
                err: err
            };
            return res.send(retObj);
        });
};

/**
 * update function
 * @param req
 * @param res
 */
exports.updateWachtwoord = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam},
        update = {
            wachtwoord: req.body.wachtwoord
        },
        options = {multi: false},
        callback = function (err, doc) {
            var retObj = {
                meta: {
                    "action": "update",
                    'timestamp': new Date(),
                    filename: __filename,
                    'doc': doc,
                    'update': update
                },
                doc: update,
                err: err
            };

            return res.send(retObj);
        };

    Gebruiker.findOneAndUpdate(conditions, update, options, callback);
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
