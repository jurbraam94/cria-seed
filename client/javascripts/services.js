/*jslint node: true */
/*global angular, console, FB, $ */

(function () {
    "use strict";
    angular.module('guitarDesignApp.services', ['ngResource'])
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
            db.gebruiker = $resource('/api/gebruiker/:gebruikersnaam/:wachtwoord', {}, actions);
            db.uitvaartSamenstellen = $resource('/api/uitvaartSamenstellen', {}, actions);
            db.uitvaartSegmentToevoegen = $resource('/api/segment', {}, actions);
            db.contact = $resource('/api/gebruiker/mail', {}, actions);
            return db;
        }]);
}());