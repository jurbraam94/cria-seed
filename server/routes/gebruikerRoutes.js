/*jslint node:true */

/** @module Routes for Gebruiker */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Gebruiker routes
 */
var controller = require('../app/controllers/GebruikerController.js');

/** CREATE route for Gebruiker */
router
    .post('/gebruiker', controller.gebruikerAanmaken);

router.
    post('/gebruiker/mail', controller.sendMail);

router.
    post('/gebruiker/loguit', controller.loguit);

router
    .post('/gebruiker/login', controller.login);


// GET
router
    .get('/gebruiker/sessie', controller.session);

// DELETE
router
    .delete('/gebruiker/:_gebruikersnaam', controller.gebruikerVerwijderen);


module.exports = router;
