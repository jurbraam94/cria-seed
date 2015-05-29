/*jslint node:true */

/** @module Routes for aanvullende gegevens */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Aanvullende gegevens routes
 */
var controller = require('../app/controllers/aanvullendeGegevensController.js');

// RETRIEVE
router
    .get('/aanvullendeGegevens/:_gebruikersnaam', controller.aanvullendeGegevens);

// UPDATE
router
    .put('/aanvullendeGegevens/:_gebruikersnaam', controller.updateAanvullendeGegevens);


module.exports = router;
