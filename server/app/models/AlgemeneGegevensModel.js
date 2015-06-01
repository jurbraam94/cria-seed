/**
 * Created by Erik-Jan on 29-5-2015.
 */
/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        algemeneGegevens,
        modelName = "AlgemeneGegevens",
        gebruiker = require('');

    algemeneGegevens = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        voornaam: {type: String, required: true, minlength: 2, maxlength: 255},
        achternaam: {type: String, required: true, minlength:2, maxlength: 255},
        woonplaats: {type: String, required: true, minlength:2, maxlength: 255},
        postcode: {type: String, required: true, minlength: 6, maxlength: 6, validate: /^[1-9]\d{3}[A-Z]{2}$/},
        adres: {type: String, required: true},
        huisnummer: {type: Number, required: true},
        telefoon: {type: String, required: true},
        email: {type: String, required: true}
    },
        { collection: 'AlgemeneGegevens' });

    module.exports = mongoose.model(modelName, algemeneGegevens);
}());
