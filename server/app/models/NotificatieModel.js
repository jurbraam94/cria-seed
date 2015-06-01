/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        notificatie,
        emailRegex = /^(([^<>()\[\]\\.,;:\s@\"]+(\.[^<>()\[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        modelName = "Notificatie";

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    notificatie = new Schema({
        gebruikersnaam: {type: String, required: true},
        naam: {type: String, required: true, validator: [stringLengteValidatie, 'Naam is niet lang genoeg']},
        email: {type: String, required: true, match: [emailRegex, 'E-mail adres is onjuist']},
        bericht: {type: String, required: true, validator: [stringLengteValidatie, 'Bericht is niet lang genoeg']},
        volgnummer: {type: Number, required: true, unique: true, min: 0}
    },
        { collection: 'Notificatie' });

    module.exports = mongoose.model(modelName, notificatie);
}());
