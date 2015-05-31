/*jslint node: true */
/*globals myApp */

/**
 * TODO: create controller for retrieving 1 book, create and delete
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
function gebruikerLoginCtrl($scope, $routeParams, $location, gebruikersnaamService) {
    "use strict";
    // LOGIN
    $scope.login = function () {
        $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: $routeParams.gebruikersnaam, wachtwoord: $routeParams.wachtwoord}, function () {
            console.log($scope.gebruiker);
        });
    };
}

myApp.controller('myCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
    $scope.whomai = "DOOD";
});

