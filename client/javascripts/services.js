/*jslint node: true */
/*global angular */

(function () {
    "use strict";

    angular.module('myApp.services', ['ngResource']).factory('gebruikersnaamService', ['$resource', '$http',

        function ($resource) {
            var actions = {
                    'get': {method: 'GET'},
                    'save': {method: 'POST'},
                    'query': {method: 'GET', isArray: true},
                    'login': { method: 'GET', params: {gebruikersnaam: 'gebruikersnaam', wachtwoord: 'wachtwoord'}},
                    'update': {method: 'PUT'},
                    'delete': {method: 'DELETE'}
                },
                db = {};
            // REST url to server
            db.gebruiker = $resource('/api/gebruiker/:gebruikersnaam/:wachtwoord', {}, actions);
            db.uitvaartSamenstellen = $resource('/api/uitvaartSamenstellen', {}, actions);
            return db;
        }]);
}());

angular.module('myApp.services', ['ngResource']).factory('Api', ['$resource', '$http',
        function ($resource) {
        "use strict";
        return {
            gebruiker: $resource('/api/gebruiker/:gebruikersnaam/:wachtwoord',
                {
                    'login': {
                        method: 'GET',
                        params: {gebruikersnaam: 'gebruikersnaam', wachtwoord: 'wachtwoord'}
                    }
                }),
            uitvaartSamenstellen: $resource('/api/uitvaartSamenstellen',
                    {
                    'save': {
                        method: 'POST',
                        params: {gebruikersnaam: 'gebruikersnaam', tijdsduur: 'tijdsduur'}
                    }
                })
        };
    }]);