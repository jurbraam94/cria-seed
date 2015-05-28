/*jslint node:true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        dood,
        gebruiker,
        algemeneGegevens,
        aanvullendeGegevens,
        uitvaart,
        muziek,
        fotos,
        wishlist,
        notificatie,
        uitvaartSamenstellen,
        segment,
        modelName;


    algemeneGegevens = new Schema({
        voornaam: {type: String, required: true},
        achternaam: {type: String, required: true},
        woonplaats: {type: String, required: true},
        postcode: {type: String, required: true},
        adres: {type: String, required: true},
        huisnummer: {type: Number, required: true},
        telefoon: {type: String, required: true},
        email: {type: String, required: true}
    },
        {
            collection: 'algemeneGegevens'
        });

    aanvullendeGegevens = new Schema({
        religie: {type: String, required: false},
        Donor: {type: String, required: true}
    },
        {
            collection: 'aanvullendeGegevens'
        });

    muziek = new Schema({
        playlistId: {type: String, required: false}
    },
        {
            collection: 'muziek'
        });

    fotos = new Schema({
        bestandsnaam: {type: String, required: true},
        volgnummer: {type: Number, required: true}
    },
        {
            collection: 'fotos'
        });

    uitvaart = new Schema({
        locatie: {type: String, required: true},
        duurOpbaring: {type: Number, required: true},
        beschrijvingOpbaring: {type: Number, required: true}
    },
        {
            collection: 'uitvaart'
        });

    wishlist = new Schema({
        bestandsnaam: {type: String, required: true},
        beschrijving: {type: String, required: true},
        content: {type: String, required: true}
    },
        {
            collection: 'wishlist'
        });

    notificatie = new Schema({
        naam: {type: String, required: true},
        email: {type: String, required: true},
        bericht: {type: String, required: true}
    },
        {
            collection: 'notificatie'
        });

    segment = new Schema({
        object: {type: String, required: true},
        percentage: {type: String, required: true},
        volgnummer: {type: String, required: true}
    },
        {
            collection: 'segment'
        });


    uitvaartSamenstellen = new Schema({
        tijdsduur: {type: Number, required: true},
        segment: [segment]
    },
        {
            collection: 'uitvaartSamenstellen'
        });


    gebruiker = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        wachtwoord: {type: String, required: true},
        algemeneGegevens: [algemeneGegevens],
        aanvullendeGegevens: [aanvullendeGegevens],
        uitvaart: [uitvaart],
        muziek: [muziek],
        fotos: [fotos],
        wishlist: [wishlist],
        notificatie: [notificatie],
        uitvaartSamenstellen: [uitvaartSamenstellen]
    },
        {
            collection: 'gebruiker'
        });

    dood = new Schema({
        gebruiker: [gebruiker]
    },
        {
            collection: 'dood'
        });

    modelName = "Dood";
    module.exports = mongoose.model(modelName, dood);
}());
