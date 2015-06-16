/*jslint node: true */
/*global angular, gebruikerLoginCtrl */

/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute', 'ngCookies', 'ngAnimate', 'ngDraggable', 'spotify', 'uiGmapgoogle-maps'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        // Get Login
        $routeProvider.when('/login', {
            templateUrl: 'partials/Login.html',
            controller: 'GebruikerLoginController',
            security: false
        });

        // Get Samenstellen
        $routeProvider.when('/samenstellen', {
            templateUrl: 'partials/Samenstellen.html',
            controller: 'SamenstellenController',
            security: true
        });

        // Get contact
        $routeProvider.when('/contact', {
            templateUrl: 'partials/Contact.html',
            controller: 'ContactController',
            security: false
        });

        // Get wie zijn wij
        $routeProvider.when('/wiezijnwij', {
            templateUrl: 'partials/wiezijnwij.html',
            security: false
        });

        // Get formulier
        $routeProvider.when('/formulier', {
            templateUrl: 'partials/formulier.html',
            controller: 'formulierController',
            security: true
        });

        // Get Muziek
        $routeProvider.when('/muziek', {
            templateUrl: 'partials/muziek.html',
            controller: 'muziekController',
            security: true
        });

        // Get Foto
        $routeProvider.when('/foto', {
            templateUrl: 'partials/foto.html',
            security: true
        });

        // Get Notificatie
        $routeProvider.when('/notificatie', {
            templateUrl: 'partials/notificatie.html',
            security: true
        });

        // Get Wishlist
        $routeProvider.when('/wishlist', {
            templateUrl: 'partials/wishlist.html',
            security: true
        });

        // Get Wishlist
        $routeProvider.when('/foto', {
            templateUrl: 'partials/foto.html',
            security: true
        });

        // Get Wishlist
        $routeProvider.when('/overzicht', {
            templateUrl: 'partials/Overzicht.html',
            security: true
        });

        // When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/overzicht"
        });

    }], function (SpotifyProvider) {
        "use strict";
        SpotifyProvider.setClientId('ABC123DEF456GHI789JKL');
        SpotifyProvider.setRedirectUri('http://www.example.com/callback.html');
        SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
        // If you already have an auth token
        SpotifyProvider.setAuthToken('zoasliu1248sdfuiknuha7882iu4rnuwehifskmkiuwhjg23');

    })
    .run(function ($rootScope, $location, DOODService) {
        "use strict";
        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (next.security) {
                var sessie = DOODService.gebruikerSessie.get(function () {
                    if (sessie.doc.gebruikersnaam === undefined) {
                        $location.path('login');
                    }
                });
            }
        });
    });
