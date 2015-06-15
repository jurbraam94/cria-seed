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

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    aanvullendeGegevens = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        religie: {type: String, required: false, validator: [stringLengteValidatie, 'De naam van uw religie is niet lang genoeg']},
        donor: {type: String, required: false, enum: ['ja', 'nee']}
    },
        { collection: 'AanvullendeGegevens' });

    module.exports = mongoose.model(modelName, aanvullendeGegevens);
}());