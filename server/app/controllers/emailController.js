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
    });

exports.sendMail = function (req, res) {
    var mailOptions = {
        from: req.body.gebruikersnaam + ' <' + req.body.email + '>', // sender address
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