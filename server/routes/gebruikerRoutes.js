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

// RETRIEVE
router
    .get('/gebruiker/:_gebruikersnaam/:_wachtwoord', controller.login);

// DELETE
router
    .delete('/gebruiker/:_gebruikersnaam', controller.gebruikerVerwijderen);


module.exports = router;
