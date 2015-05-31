/*global angular, BookListCtrl, BookDetailCtrl */


/**
 *
 * Writing AngularJS Documentation
 *
 * @see https://github.com/angular/angular.js/wiki/Writing-AngularJS-Documentation
 * @see http://docs.angularjs.org/guide/concepts
 */
var myApp = angular.module('myApp', ['myApp.services', 'ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        "use strict";

        // Get all gebruiker
        $routeProvider.when('/gebruiker', {
            templateUrl: 'partials/book-list.html',
            controller: BookListCtrl
        });

        // Get 1 book
        $routeProvider.when('/gebruiker/:_id', {
            templateUrl: 'partials/Login.html',
            controller: bookLoginCtrl
        });

        // When no valid route is provided
        $routeProvider.otherwise({
            redirectTo: "/gebruiker"
        });


        //Samenstellen uitvaart
       // $routeProvider.when('/samenstellen.html')

    }]);
