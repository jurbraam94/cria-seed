/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        gebruiker,
        modelName = "Gebruiker";

    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length > 2 && val.length < 256);
    }
    console.log(stringLengteValidatie("hoihoihoi"));
    gebruiker = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        wachtwoord: {type: String, required: true}
    },
        { collection: 'Gebruiker' });
    module.exports = mongoose.model(modelName, gebruiker);
}());
