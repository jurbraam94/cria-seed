/*jslint node:true */

/** @module Routes for Gebruiker */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Gebruiker routes
 */
var controller = require('../app/controllers/UitvaartSamenstellenController.js');

/** CREATE route for Gebruiker */
router
    .post('/UitvaartSamenstellen', controller.UitvaartSamenstellenMaken);

// RETRIEVE
router
    .get('/UitvaartSamenstellen/:_gebruikersnaam', controller.UitvaartSamenstellenDetails);

// UPDATE
router
    .put('/UitvaartSamenstellen/:_gebruikersnaam', controller.UitvaartSamenstellenUpdaten);

module.exports = router;
