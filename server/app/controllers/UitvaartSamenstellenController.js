/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    UitvaartSamenstellen = mongoose.model('UitvaartSamenstellen');

/**
 * create function
 * @param req
 * @param res
 */
exports.UitvaartSamenstellenMaken = function (req, res) {
    var doc = new UitvaartSamenstellen(req.body);

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
exports.UitvaartSamenstellenDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    UitvaartSamenstellen.findOne(conditions, fields)
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
exports.UitvaartSamenstellenUpdaten = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam},
        update = {
            tijdsduur: req.body.tijdsduur
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

    UitvaartSamenstellen.findOneAndUpdate(conditions, update, options, callback);
};