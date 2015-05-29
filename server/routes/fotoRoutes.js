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
    .post('/foto', controller.fotoUploaden);

// RETRIEVE
router
    .get('/foto/:_gebruikersnaam', controller.alleFotos)
    .get('/foto/:_gebruikersnaam/:_volgnummer', controller.fotoDetails);

// DELETE
router
    .delete('/foto/:_gebruikersnaam', controller.fotoVerwijderen);

module.exports = router;
