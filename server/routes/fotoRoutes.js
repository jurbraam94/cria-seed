/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node:true */

/** @module Routes for Foto */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Foto routes
 */
var controller = require('../app/controllers/FotoController.js');

/** CREATE route for Foto */
router
    .post('/gebruiker', controller.fotoUploaden());

// RETRIEVE
router
    .get('/gebruiker', controller.alleGebruikers)
    .get('/gebruiker/:_gebruikersnaam', controller.fotoDetails());

// DELETE
router
    .delete('/gebruiker/:_gebruikersnaam', controller.fotoVerwijderen());

module.exports = router;
