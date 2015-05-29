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
            gebruikersnaam: {type: Schema.ObjectId, ref: 'Gebruiker.gebruiker'},
            voornaam: {type: String, required: false},
            achternaam: {type: String, required: false},
            woonplaats: {type: String, required: false},
            postcode: {type: String, required: false},
            adres: {type: String, required: false},
            huisnummer: {type: Number, required: false},
            telefoon: {type: String, required: false},
            email: {type: String, required: false}
        },
        { collection: 'AlgemeneGegevens' });

    module.exports = mongoose.model(modelName, algemeneGegevens);
}());
