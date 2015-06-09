/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node:true */

/** @module Routes for Segment */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Segment routes
 */
var controller = require('../app/controllers/SegmentController.js');

/** CREATE route for Segment */
router
    .post('/segment', controller.segmentAanmaken);

// RETRIEVE
router
    .get('/segment/:_gebruikersnaam', controller.alleSegmenten)
    .get('/segment/:_gebruikersnaam/:_volgnummer', controller.segmentDetails);

// UPDATE
router
    .put('/segment/:_gebruikersnaam/:_volgnummer', controller.updateSegment);

// DELETE
router
    .delete('/segment/:_gebruikersnaam/', controller.segmentenVerwijderen);

module.exports = router;
