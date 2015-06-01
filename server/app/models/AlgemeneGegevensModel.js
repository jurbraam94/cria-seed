/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        algemeneGegevens,
        emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        modelName = "AlgemeneGegevens";

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    algemeneGegevens = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        voornaam: {type: String, required: true, validator: [stringLengteValidatie, 'Voornaam is niet lang genoeg']},
        achternaam: {type: String, required: true, validator: [stringLengteValidatie, 'Achternaam is niet lang genoeg']},
        woonplaats: {type: String, required: true, validator: [stringLengteValidatie, 'Woonplaats is niet lang genoeg']},
        postcode: {type: String, required: true, validator: [stringLengteValidatie, 'Postcode is niet lang genoeg'], validate: /^[1-9]\d{3}[A-Z]{2}$/},
        adres: {type: String, required: true, validator: [stringLengteValidatie, 'Adres is niet lang genoeg']},
        huisnummer: {type: Number, required: true, min: 1},
        telefoon: {type: String, required: true, min: 1000000000},
        email: {type: String, required: true, match: [emailRegex, 'E-mail adres is onjuist']}
    },
        { collection: 'AlgemeneGegevens' });

    module.exports = mongoose.model(modelName, algemeneGegevens);
}());
