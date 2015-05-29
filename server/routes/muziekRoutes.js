/*jslint node:true */

/** @module Routes for Gebruiker */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Gebruiker routes
 */
var controller = require('../app/controllers/MuziekController.js');

/** CREATE route for Gebruiker */
router
    .post('/Muziek', controller.playlistAanmaken);

// RETRIEVE
router
    .get('/Muziek/:_gebruikersnaam', controller.playlistDetails());
module.exports = router;
