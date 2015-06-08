/*global angular, gebruikerLoginCtrl */

/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute', 'ngCookies', 'ngAnimate', 'ngDraggable'])
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
            security: true
        });

        // Get Muziek
        $routeProvider.when('/muziek', {
            templateUrl: 'partials/muziek.html',
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
    }])
    .run(function ($rootScope, $location, DOODService) {
        "use strict";
        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (next.security) {
                var sessie = DOODService.gebruikerSessie.get(function () {
                    if (Object.keys(sessie.err).length !== 0) {
                        $location.path('/login');
                    }
                });
            }
        });
    });
