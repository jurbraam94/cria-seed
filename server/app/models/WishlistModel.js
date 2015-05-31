/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        //gebruiker = require('Gebruiker'),
        wishlist,
        modelName = "Wishlist";

    wishlist = new Schema({
        gebruikersnaam: {type: String, required: true},
        bestandsnaam: {type: String, required: true, validator: [stringLengteValidatie, 'Bestandsnaam is niet lang genoeg']},
        beschrijving: {type: String, required: true, validator: [stringLengteValidatie, 'Beschrijving is niet lang genoeg']},
        content: {type: String, required: true, enum: ['mp4', 'mp3', 'mkv', 'avi', 'jpg', 'png', 'bmp', 'pdf', 'txt', 'doc', 'docx']},
        volgnummer: {type: Number, required: true, unique: true, min: 0} //TODO: auto increment?
    },
        { collection: 'Wishlist' });

    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    module.exports = mongoose.model(modelName, wishlist);
}());
