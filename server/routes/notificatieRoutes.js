/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node:true */

/** @module Routes for Notificatie */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Notificatie routes
 */
var controller = require('../app/controllers/NotificatieController.js');

/** CREATE route for Notificatie */
router
    .post('/notificatie', controller.notificatieAanmaken);

// RETRIEVE
router
    .get('/notificatie', controller.alleNotificaties)
    .get('/notificatie/:_gebruikersnaam', controller.notificatieDetails);

// DELETE
router
    .delete('/notificatie/:_gebruikersnaam', controller.notificatieVerwijderen);

module.exports = router;
