/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Dood = mongoose.model('Dood').aanvullendeGegevens;

/**
 * retrieve one function
 * @param req
 * @param res
 */
exports.aanvullendeGegevens = function (req, res) {
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
exports.updateAanvullendeGegevens = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam},
        update = {
            religie: req.body.religie,
            Donor: req.body.donor
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