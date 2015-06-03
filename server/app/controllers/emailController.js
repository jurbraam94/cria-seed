/*jslint node: true */
"use strict";

var mongoose = require('mongoose'),
    nodemailer = require('nodemailer'),
    transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'criaprojectgroep7@gmail.com',
            pass: 'CRIAPROJECT7'
        }
    }),
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

exports.sendMail = function (req, res) {
    console.log("starting to send mail");
    var mailOptions = {
        from: req.body.naam + ' <' + req.body.email + '>', // sender address
        to: 'criaprojectgroep7@gmail.com', // list of receivers
        subject: 'DOOD Contact', // Subject line
        text: req.body.bericht, // plaintext body
        html: req.body.bericht // html body
    }, retObj;

// send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            retObj = {
                meta: {
                    "action": "create",
                    'timestamp': new Date(),
                    filename: __filename
                },
                err: error
            };

            return res.send(retObj);
        }
        retObj = {
            meta: {
                "action": "create",
                'timestamp': new Date(),
                filename: __filename
            },
            doc: info.response
        };

        return res.send(retObj);
    });
};