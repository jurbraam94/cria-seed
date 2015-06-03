/*jslint node:true */

/** @module Routes for Foto */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Email routes
 */
var controller = require('../app/controllers/emailController.js');


router
    .get('/foto/:_gebruikersnaam', controller.alleFotos);

/** POST for sending email */
router
    .post('/email', controller.sendMail);


module.exports = router;
