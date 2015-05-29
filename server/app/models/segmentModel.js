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
        gebruiker: [{type: Schema.ObjectId, ref: 'Gebruiker'}],
        object: {type: String, required: false},
        percentage: {type: String, required: false},
        volgnummer: {type: String, required: false}
    },
        { collection: 'segment' });
    module.exports = mongoose.model(modelName, segment);
}());
