/*global angular, gebruikerLoginCtrl */


/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute', 'ngCookies'])
    .config(['$routeProvider', '$cookieStore', '$location', '$rootScope', function ($routeProvider, $cookieStore, $location, $rootScope) {
        "use strict";

        // Get all gebruiker
        $routeProvider.when('/login', {
            templateUrl: 'partials/Login.html',
            controller: 'GebruikerLoginController',
            security: false
        });

        // Get all gebruiker
        $routeProvider.when('/samenstellen', {
            templateUrl: 'Samenstellen.html',
            controller: 'SamenstellenController',
            security: true
        });

        // When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/login"
        });

        $rootScope.$on("$routeChangeStart", function (event, next) {
            if (next.security) {
                if ($cookieStore.get('sessionCookie') === undefined) {
                    $location.path('/login');
                }
            }
        });
        //Samenstellen uitvaart
       // $routeProvider.when('/samenstellen.html')

    }]);
