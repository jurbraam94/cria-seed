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
        gebruiker: [{type: Schema.ObjectId, ref: 'Gebruiker'}],
        bestandsnaam: {type: String, required: false},
        beschrijving: {type: String, required: false},
        content: {type: String, required: false}
    },
        { collection: 'wishlist' });
    module.exports = mongoose.model(modelName, wishlist);
}());
