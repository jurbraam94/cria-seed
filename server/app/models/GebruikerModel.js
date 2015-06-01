/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        gebruiker,
        modelName = "Gebruiker";

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    gebruiker = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true, validator: [stringLengteValidatie, 'Gebruikersnaam is niet lang genoeg'], validate: /[a-z]/},
        passwordHash: {type: Hash, required: true},
        passwordSalt: {type: String, required: true}
    },
        { collection: 'Gebruiker' });
    module.exports = mongoose.model(modelName, gebruiker);
}());
