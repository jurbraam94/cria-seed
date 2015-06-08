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
            db.uitvaartSamenstellen = $resource('/api/uitvaartSamenstellen/:gebruikersnaam', {"gebruikersnaam": "gebruikersnaam"}, actions);
            db.uitvaartSegment = $resource('/api/segment/:gebruikersnaam/:volgnummer', {"gebruikersnaam": "gebruikersnaam", "volgnummer": "volgnummer"}, actions);
            db.contact = $resource('/api/gebruiker/mail', {}, actions);
            return db;
        }]);
}());