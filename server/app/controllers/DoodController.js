/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Dood = mongoose.model('Dood');

/**
 * create function
 * @param req
 * @param res
 */
exports.create = function (req, res) {
    var doc = new Dood(req.body);

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
exports.list = function (req, res) {
    var conditions = {}, fields = {}, sort = {'modificationDate': -1};

    Dood.find(conditions, fields)
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
exports.detail = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    Dood.findOne(conditions, fields)
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
exports.updateOne = function (req, res) {
    var conditions = {_gebruikersnaam: req.params._gebruikersnaam},
        update = {
            gebruikersnaam: req.body.doc.gebruikersnaam || '',
            wachtwoord: req.body.doc.wachtwoord || ''
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

    Dood.findOneAndUpdate(conditions, update, options, callback);
};

/**
 * delete function
 * @param req
 * @param res
 */
exports.deleteOne = function (req, res) {
    var conditions, fields = {}, retObj;

    conditions = {_gebruikersnaam: req.params._gebruikersnaam};

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
    Dood.findOne(conditions, fields).remove();
};
