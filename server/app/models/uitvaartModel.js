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
        gebruiker: [{type: Schema.ObjectId, ref: 'Gebruiker'}],
        locatie: {type: String, required: false},
        duurOpbaring: {type: Number, required: false},
        beschrijvingOpbaring: {type: Number, required: false}
    },
        { collection: 'uitvaart' });
    module.exports = mongoose.model(modelName, uitvaart);
}());
