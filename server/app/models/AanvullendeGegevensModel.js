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
        aanvullendeGegevens,
        modelName = "AanvullendeGegevens";

    aanvullendeGegevens = new Schema({
        gebruikersnaam: {type: Schema.ObjectId, ref: 'Gebruiker.gebruiker'},
        religie: {type: String, required: false},
        donor: {type: String, required: false}
    },
        { collection: 'AanvullendeGegevens' });

    module.exports = mongoose.model(modelName, aanvullendeGegevens);
}());