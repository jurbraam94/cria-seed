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
var controller = require('../app/controllers/UitvaartController.js');

/** CREATE route for Algemene gegevens */
router
    .post('/uitvaart', controller.UitvaartAanmaken);

// RETRIEVE
router
    .get('/uitvaart/:_gebruikersnaam', controller.UitvaartDetails);

// UPDATE
router
    .put('/uitvaart/:_gebruikersnaam', controller.UitvaartUpdaten);

module.exports = router;
