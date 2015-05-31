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
        locatie: {type: String, required: true},
        duurOpbaring: {type: Number, required: true},
        beschrijvingOpbaring: {type: String, required: false}
    },
        { collection: 'Uitvaart' });
    module.exports = mongoose.model(modelName, uitvaart);
}());
