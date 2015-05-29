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
        fotos,
        modelName = "FotoModel";

    fotos = new Schema({
            gebruikersnaam: {type: Schema.ObjectId, ref: 'Gebruiker.gebruiker'},
            bestandsnaam: {type: String, required: false},
            volgnummer: {type: Number, required: false}
        },
        { collection: 'fotos' });

    module.exports = mongoose.model(modelName, fotos);
}());
