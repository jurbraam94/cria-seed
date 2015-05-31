/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    AanvullendeGegevens = mongoose.model('AanvullendeGegevens');

/**
 * retrieve one function
 * @param req
 * @param res
 */
exports.aanvullendeGegevensAanmaken = function (req, res) {

    var doc = new AanvullendeGegevens(req.body);

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

exports.aanvullendeGegevens = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {};

    AanvullendeGegevens.findOne(conditions, fields)
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
            donor: req.body.donor
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

    AanvullendeGegevens.findOneAndUpdate(conditions, update, options, callback);
};
