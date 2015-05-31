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

    uitvaart = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        locatie: {type: String, required: true, validator: [stringLengteValidatie, 'Locatienaam is niet lang genoeg']},
        duurOpbaring: {type: Number, required: true, min: 0},
        beschrijvingOpbaring: {type: String, required: false, validator: [stringLengteValidatie, 'Beschrijving is niet lang genoeg']}
    },
        { collection: 'Uitvaart' });

    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    module.exports = mongoose.model(modelName, uitvaart);
}());
