/*jslint node: true */
/*global angular, console, FB, $ */

(function () {
    "use strict";
    angular.module('myApp.services', ['ngResource'])
        .factory('DOODService', ['$resource', '$http', function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'post': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            // REST url to server
            db.gebruikerLogin = $resource('/api/gebruiker/login', {}, actions);
            db.gebruikerLoguit = $resource('/api/gebruiker/loguit', {}, actions);
            db.gebruikerSessie = $resource('/api/gebruiker/sessie', {}, actions);
            db.uitvaartSamenstellen = $resource('/api/uitvaartSamenstellen/:gebruikersnaam', {"gebruikersnaam": "@gebruikersnaam"}, actions);
            db.uitvaartSamenstellenPost = $resource('/api/uitvaartSamenstellen', {}, actions);
            db.aanvullendeGegevensPost = $resource('/api/aanvullendeGegevens', {}, actions);
            db.aanvullendeGegevens = $resource('/api/aanvullendeGegevens/:gebruikersnaam', {"gebruikersnaam": "@gebruikersnaam"}, actions);
            db.algemeneGegevensPost = $resource('/api/algemeneGegevens', {}, actions);
            db.algemeneGegevens = $resource('/api/algemeneGegevens/:gebruikersnaam', {"gebruikersnaam": "@gebruikersnaam"}, actions);
            db.uitvaartPost = $resource('/api/uitvaart', {}, actions);
            db.uitvaart = $resource('/api/uitvaart/:gebruikersnaam', {"gebruikersnaam": "@gebruikersnaam"}, actions);
            db.uitvaartSegmentPost = $resource('/api/segment/', {}, actions);
            db.uitvaartSegmentLijst = $resource('/api/segment/:gebruikersnaam', {"gebruikersnaam": "@gebruikersnaam"}, actions);
            db.uitvaartSegmentenVerwijderen = $resource('/api/segment/:gebruikersnaam', {"gebruikersnaam": "@gebruikersnaam"}, actions);

            db.contact = $resource('/api/gebruiker/mail', {}, actions);
            return db;
        }]);
}());