/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node:true */

/** @module Routes for Algemene gegevens */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Algemene gegevens routes
 */
var controller = require('../app/controllers/AlgemeneGegevensController.js');

/** CREATE route for Algemene gegevens */
router
    .post('/algemeneGegevens', controller.algGegevensAanmaken);

// RETRIEVE
router
    .get('/algemeneGegevens/:_gebruikersnaam', controller.algGegevensDetails);

// UPDATE
router
    .put('/algemeneGegevens/:_gebruikersnaam', controller.updateAlgGegevens);

module.exports = router;
