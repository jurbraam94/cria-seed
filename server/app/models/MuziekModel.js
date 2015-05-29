/**
 * Created by Erik-Jan on 29-5-2015.
 */
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
        gebruikersnaam: {type: Schema.ObjectId, ref: 'Gebruiker.gebruiker'},
        playlistId: {type: String, required: false}
    },
        { collection: 'Muziek' });

    module.exports = mongoose.model(modelName, muziek);
}());
