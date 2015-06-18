/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        muziek,
        modelName = "Muziek";

    muziek = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        playlistId: {type: Number, required: true, min: 0}
    },
        { collection: 'Muziek' });

    module.exports = mongoose.model(modelName, muziek);
}());
