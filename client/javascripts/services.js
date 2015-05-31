/*global angular */

(function () {
    "use strict";

    angular.module('myApp.services', ['ngResource']).factory('gebruikersnaamService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'login': { method: 'GET', url: '/api/gebruiker/:_gebruikersnaam/:_wachtwoord'},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            // REST url to server
            db.gebruiker = $resource('/api/gebruiker/', {}, actions);
            return db;
        }]);
}());