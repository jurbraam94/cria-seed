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
        foto,
        modelName = "Foto";

    foto = new Schema({
        gebruikersnaam: {type: String, required: true},
        bestandsnaam: {type: String, required: true},
        volgnummer: {type: Number, required: true, unique: true}
    },
        { collection: 'Foto' });

    module.exports = mongoose.model(modelName, foto);
}());
