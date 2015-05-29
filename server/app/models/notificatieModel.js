/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        notificatie,
        modelName = "Notificatie";

    notificatie = new Schema({
        gebruiker: [{type: Schema.ObjectId, ref: 'Gebruiker'}],
        naam: {type: String, required: false},
        email: {type: String, required: false},
        bericht: {type: String, required: false}
    },
        { collection: 'Notificatie' });
    module.exports = mongoose.model(modelName, notificatie);
}());
