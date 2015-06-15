/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        uitvaart,
        modelName = "Uitvaart";

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    uitvaart = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        locatie: {type: String, required: false, validator: [stringLengteValidatie, 'Locatienaam is niet lang genoeg']},
        duurOpbaring: {type: Number, required: false, min: 0},
        beschrijvingOpbaring: {type: String, required: false, validator: [stringLengteValidatie, 'Beschrijving is niet lang genoeg']}
    },
        { collection: 'Uitvaart' });

    module.exports = mongoose.model(modelName, uitvaart);
}());
