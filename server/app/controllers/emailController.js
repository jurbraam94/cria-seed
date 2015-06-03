/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    Fotos = mongoose.model('Foto');

exports.alleFotos = function (req, res) {
    var conditions = {gebruikersnaam: req.params._gebruikersnaam}, fields = {}, sort = {'modificationDate': -1};

    Fotos.find(conditions, fields)
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
