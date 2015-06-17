/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node:true */

/** @module Routes for Wishlist */
/** @class */
var express = require('express');
var router = express.Router();

/**
 * Wishlist routes
 */
var controller = require('../app/controllers/WishlistController.js');

/** CREATE route for Wishlist */
router
    .post('/wishlist', controller.wishlistAanmaken);

// RETRIEVE
router
    .get('/wishlist/:_gebruikersnaam', controller.alleWishlists);

// DELETE
router
    .delete('/wishlist/:_gebruikersnaam/:_volgnummer', controller.wishlistVerwijderen);

module.exports = router;
