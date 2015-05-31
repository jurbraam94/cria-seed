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
    .get('/notificatie/:_gebruikersnaam', controller.alleNotificaties)
    .get('/notificatie/:_gebruikersnaam/:_volgnummer', controller.notificatieDetails);

// UPDATE
router
    .put('/notificatie/:_gebruikersnaam/:_volgnummer', controller.updateNotificatie);

// DELETE
router
    .delete('/notificatie/:_gebruikersnaam/:_volgnummer', controller.notificatieVerwijderen);

module.exports = router;
