/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        segment,
        modelName = "Segment";

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    segment = new Schema({
        gebruikersnaam: {type: String, required: true},
        object: {type: String, required: true, validator: [stringLengteValidatie, 'Bestandsnaam is niet lang genoeg']},
        percentage: {type: Number, required: true, min: 1},
        volgnummer: {type: Number, required: true, unique: true, min: 0}
    },
        { collection: 'Segment' });

    module.exports = mongoose.model(modelName, segment);
}());
