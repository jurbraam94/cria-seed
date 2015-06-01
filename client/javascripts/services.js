/*global angular */

(function () {
    "use strict";

    angular.module('myApp.services', ['ngResource']).factory('gebruikersnaamService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'login': { method: 'GET'},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            // REST url to server
            db.gebruiker = $resource('/api/gebruiker/:_gebruikersnaam/:_wachtwoord', {}, actions);
            return db;
        }]);
}());