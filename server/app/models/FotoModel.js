/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        foto,
        modelName = "Foto";

    /**
     * Controleerd of de lengte van string val tussen de 2 en 255 ligt
     * @param val
     * @returns {boolean}
     */
    function stringLengteValidatie(val) {
        return (val !== undefined && val !== null && val.length >= 2 && val.length <= 255);
    }

    foto = new Schema({
        gebruikersnaam: {type: String, required: true},
        bestandsnaam: {type: String, required: true, validator: [stringLengteValidatie, 'Bestandsnaam is niet lang genoeg']},
        volgnummer: {type: Number, required: true, unique: true, min: 0}
    },
        { collection: 'Foto' });

    module.exports = mongoose.model(modelName, foto);
}());
