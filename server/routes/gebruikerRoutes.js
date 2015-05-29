/*jslint node:true */

/** @module Routes for Gebruiker */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Gebruiker routes
 */
var controller = require('../app/controllers/gebruikerController.js');

/** CREATE route for Gebruiker */
router
    .post('/gebruiker', controller.gebruikerAanmaken);

// RETRIEVE
router
    .get('/gebruiker', controller.allUsers)
    .get('/gebruiker/:_gebruikersnaam', controller.gebruikerDetails);

// UPDATE
router
    .put('/gebruiker/:_gebruikersnaam', controller.updateWachtwoord());

// DELETE
router
    .delete('/gebruiker/:_gebruikersnaam', controller.gebruikerVerwijderen);


module.exports = router;
