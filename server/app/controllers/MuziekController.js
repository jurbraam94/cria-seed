/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Muziek = mongoose.model('Muziek');

/**
 * create function
 * @param req
 * @param res
 */
exports.playlistAanmaken = function (req, res) {
    var doc = new Muziek(req.body);

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
exports.playlistDetails = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    Muziek.findOne(conditions, fields)
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