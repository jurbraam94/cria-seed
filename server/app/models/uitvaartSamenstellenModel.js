/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        uitvaartSamenstellen,
        modelName = "UitvaartSamenstellen";

    uitvaartSamenstellen = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        tijdsduur: {type: Number, required: true},
    },
        { collection: 'uitvaartSamenstellen' });

    module.exports = mongoose.model(modelName, uitvaartSamenstellen);
}());
