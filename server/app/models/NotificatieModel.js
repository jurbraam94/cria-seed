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
        gebruikersnaam: {type: String, required: true},
        naam: {type: String, required: true},
        email: {type: String, required: true},
        bericht: {type: String, required: true},
        volgnummer: {type: Number, required: true, unique: true}
    },
        { collection: 'Notificatie' });
    module.exports = mongoose.model(modelName, notificatie);
}());
