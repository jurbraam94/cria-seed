/*jslint node:true */

/** @module Routes for Dood */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Dood routes
 */
var controller = require('../app/controllers/DoodController.js');

/** CREATE route for Dood */
router
    .post('/dood', controller.create);

// RETRIEVE
router
    .get('/dood', controller.list)
    .get('/dood/:_gebruikersnaam', controller.detail);

// UPDATE
router
    .put('/dood/:_gebruikersnaam', controller.updateOne);

// DELETE
router
    .delete('/dood/:_gebruikersnaam', controller.deleteOne);


module.exports = router;
