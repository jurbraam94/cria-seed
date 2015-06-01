/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        notificatie,
        //emailRegex = /^([\w-]+\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
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
        email: {type: String, required: true, match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'E-mail adres is onjuist']},
        bericht: {type: String, required: true, validator: [stringLengteValidatie, 'Naam is niet lang genoeg']},
        volgnummer: {type: Number, required: true, unique: true, min: 0}
    },
        { collection: 'Notificatie' });


    ///**
    // * Valideert ingevoerde e-mail adres m.b.v. emailRegex:
    // * /^([\w-]+\.]+@([\w-]+\.)+[\w-]{2,4})?$/
    // * @param email
    // * @returns {boolean}
    // */
    //notificatie.path('email').validate(function (email) {
    //    return emailRegex.test(email.text);
    //}, 'E-mail adres is onjuist');

    module.exports = mongoose.model(modelName, notificatie);
}());
