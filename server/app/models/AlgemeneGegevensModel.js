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
        algemeneGegevens,
        modelName = "AlgemeneGegevens";

    algemeneGegevens = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        voornaam: {type: String, required: true},
        achternaam: {type: String, required: true},
        woonplaats: {type: String, required: true},
        postcode: {type: String, required: true},
        adres: {type: String, required: true},
        huisnummer: {type: Number, required: true},
        telefoon: {type: String, required: true},
        email: {type: String, required: true}
    },
        { collection: 'AlgemeneGegevens' });

    module.exports = mongoose.model(modelName, algemeneGegevens);
}());
