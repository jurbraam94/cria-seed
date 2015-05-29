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
        gebruiker: [{type: Schema.ObjectId, ref: 'Gebruiker'}],
        tijdsduur: {type: Number, required: false},
        segment: [{type: Schema.ObjectId, ref: 'Segment'}]
    },
        { collection: 'uitvaartSamenstellen' });

    module.exports = mongoose.model(modelName, uitvaartSamenstellen);
}());
