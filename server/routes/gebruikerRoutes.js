/*jslint node:true */

/** @module Routes for Dood */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Dood routes
 */
var controller = require('../app/controllers/gebruikerController.js');

/** CREATE route for Dood */
router
    .post('/gebruiker', controller.createUser);

// RETRIEVE
router
    .get('/gebruiker', controller.allUsers)
    .get('/gebruiker/:_gebruikersnaam', controller.userDetails);

// UPDATE
router
    .put('/gebruiker/:_gebruikersnaam', controller.updatePassword);

// DELETE
router
    .delete('/gebruiker/:_gebruikersnaam', controller.deleteUser);


module.exports = router;
