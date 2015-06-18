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

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    wishlist = new Schema({
        gebruikersnaam: {type: String, required: true},
        titel: {type: String, required: true, validator: [stringLengteValidatie, 'Titel is niet lang genoeg']},
        wens: {type: String, required: true, validator: [stringLengteValidatie, 'Bericht is niet lang genoeg']}
    },
        { collection: 'Wishlist' });

    module.exports = mongoose.model(modelName, wishlist);
}());
