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

    segment = new Schema({
        gebruikersnaam: {type: String, required: true},
        object: {type: String, required: true},
        percentage: {type: String, required: true},
        volgnummer: {type: Number, required: true}
    },
        { collection: 'Segment' });
    module.exports = mongoose.model(modelName, segment);
}());
