/*jslint node: true */
/*global angular */


angular.module('myApp.services', ['ngResource']).factory('Api', ['$resource', '$http',
        function ($resource) {
        "use strict";
        return {
            gebruiker: $resource('/api/gebruiker/:gebruikersnaam/:wachtwoord', {},
                {
                    'login': {
                        method: 'GET',
                        params: {gebruikersnaam: 'gebruikersnaam', wachtwoord: 'wachtwoord'}
                    }
                }),
            uitvaartSamenstellen: $resource('/api/uitvaartSamenstellen', {},
                {
                    'save': {
                        method: 'POST',
                        params: {
                            gebruikersnaam: 'gebruikersnaam',
                            tijdsduur: 'tijdsduur'
                        }
                    }
                }),
            uitvaartSegmentToevoegen: $resource('/api/segment', {},
                {
                    'Create': {
                        method: 'POST',
                        params: {
                            gebruikersnaam: 'gebruikersnaam',
                            object: 'object',
                            percentage: 'percentage',
                            volgnummer: 'volgnummer'
                        }
                    }
                }),
            contact: $resource('/api/gebruiker/mail', {},
                {
                    'mail': {
                        method: 'POST',
                        headers : {'Content-Type': 'application/x-www-form-urlencoded'},
                        data: {
                            naam: 'naam',
                            email: 'email',
                            bericht: 'bericht'
                        }
                    }
                })
        };
    }]);