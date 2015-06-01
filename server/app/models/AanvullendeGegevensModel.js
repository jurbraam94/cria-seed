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
        gebruikersnaam: {type: String, required: true, unique: true},
        religie: {type: String, required: true, min: 2, max: 20},
        donor: {type: String, required: true, enum: [ 'ja', 'nee'] }
    },
        { collection: 'AanvullendeGegevens' });

    module.exports = mongoose.model(modelName, aanvullendeGegevens);
}());