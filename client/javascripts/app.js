/*global angular, gebruikerLoginCtrl */


/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute', 'ngCookies'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        // Get all gebruiker
        $routeProvider.when('/login', {
            templateUrl: 'partials/Login.html',
            controller: 'GebruikerLoginController'
        });

        // Get all gebruiker
        $routeProvider.when('/samenstellen', {
            templateUrl: 'Samenstellen.html',
            controller: 'SamenstellenController'
        });

        // When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/login"
        });


        //Samenstellen uitvaart
       // $routeProvider.when('/samenstellen.html')

    }]);
