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

    gebruiker = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        wachtwoord: {type: String, required: true}
    },
        { collection: 'Gebruiker' });
    module.exports = mongoose.model(modelName, gebruiker);
}());