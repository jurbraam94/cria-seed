/*jslint node:true */

/** @module Routes for Foto */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Email routes
 */
var controller = require('../app/controllers/emailController.js');

/** POST for sending email */
router
    .post('/mail', controller.sendMail);

module.exports = router;
