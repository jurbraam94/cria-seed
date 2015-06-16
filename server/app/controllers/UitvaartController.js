/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Uitvaart = mongoose.model('Uitvaart');

/**
 * create function
 * @param req
 * @param res
 */
exports.UitvaartAanmaken = function (req, res) {
    var doc = new Uitvaart(req.body);

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
 * retrieve one function
 * @param req
 * @param res
 */
exports.UitvaartDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    Uitvaart.findOne(conditions, fields)
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
exports.UitvaartUpdaten = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam},
        update = {
            locatie: req.body.locatie || '',
            duurOpbaring: req.body.duurOpbaring || '',
            beschrijvingOpbaring: req.body.beschrijvingOpbaring || ''
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

    Uitvaart.findOneAndUpdate(conditions, update, options, callback);
};