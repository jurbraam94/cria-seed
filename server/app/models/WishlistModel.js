/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        wishlist,
        modelName = "Wishlist";

    wishlist = new Schema({
        gebruikersnaam: {type: String, required: true},
        bestandsnaam: {type: String, required: true},
        beschrijving: {type: String, required: true},
        content: {type: String, required: true},
        volgnummer: {type: Number, required: true, unique: true}
    },
        { collection: 'Wishlist' });
    module.exports = mongoose.model(modelName, wishlist);
}());
