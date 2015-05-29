/*jslint node: true */

(function () {
    "use strict";
    /**
     * Module dependencies.
     */
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema,
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
        modelName = "Dood";

    algemeneGegevens = new Schema({
        voornaam: {type: String, required: false},
        achternaam: {type: String, required: false},
        woonplaats: {type: String, required: false},
        postcode: {type: String, required: false},
        adres: {type: String, required: false},
        huisnummer: {type: Number, required: false},
        telefoon: {type: String, required: false},
        email: {type: String, required: false}
    },
        { collection: 'algemeneGegevens' });

    aanvullendeGegevens = new Schema({
        religie: {type: String, required: false},
        Donor: {type: String, required: false}
    },
        { collection: 'aanvullendeGegevens' });

    muziek = new Schema({
        playlistId: {type: String, required: false}
    },
        { collection: 'muziek' });

    fotos = new Schema({
        bestandsnaam: {type: String, required: false},
        volgnummer: {type: Number, required: false}
    },
        { collection: 'fotos' });

    uitvaart = new Schema({
        locatie: {type: String, required: false},
        duurOpbaring: {type: Number, required: false},
        beschrijvingOpbaring: {type: Number, required: false}
    },
        { collection: 'uitvaart' });

    wishlist = new Schema({
        bestandsnaam: {type: String, required: false},
        beschrijving: {type: String, required: false},
        content: {type: String, required: false}
    },
        { collection: 'wishlist' });

    notificatie = new Schema({
        naam: {type: String, required: false},
        email: {type: String, required: false},
        bericht: {type: String, required: false}
    },
        { collection: 'notificatie' });

    segment = new Schema({
        object: {type: String, required: false},
        percentage: {type: String, required: false},
        volgnummer: {type: String, required: false}
    },
        { collection: 'segment' });

    uitvaartSamenstellen = new Schema({
        tijdsduur: {type: Number, required: false},
        segment: [{type: Schema.ObjectId, ref: 'Dood.segment'}]
    },
        { collection: 'uitvaartSamenstellen' });

    gebruiker = new Schema({
        gebruikersnaam: {type: String, required: true, unique: true},
        wachtwoord: {type: String, required: true},
        algemeneGegevens: {type: Schema.ObjectId, ref: 'Dood.algemeneGegevens'},
        aanvullendeGegevens: {type: Schema.ObjectId, ref: 'Dood.aanvullendeGegevens'},
        uitvaart: {type: Schema.ObjectId, ref: 'Dood.uitvaart'},
        muziek: [{type: Schema.ObjectId, ref: 'Dood.muziek'}],
        fotos: [{type: Schema.ObjectId, ref: 'Dood.fotos'}],
        wishlist: [{type: Schema.ObjectId, ref: 'Dood.wishlist'}],
        notificatie: [{type: Schema.ObjectId, ref: 'Dood.notificatie'}],
        uitvaartSamenstellen: {type: Schema.ObjectId, ref: 'Dood.uitvaartSamenstellen'}
    },
        { collection: 'gebruiker' });

    console.log(algemeneGegevens, aanvullendeGegevens, uitvaart, muziek, fotos, wishlist, notificatie, segment, uitvaartSamenstellen);
    module.exports = mongoose.model(modelName, gebruiker);
}());
