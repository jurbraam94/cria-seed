/*jslint node: true */
/*globals myApp */

/**
 * TODO: create controller for retrieving 1 book, create and delete
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
myApp.controller('gebruikerLoginCtrl', function ($scope, $routeParams, $location, gebruikersnaamService) {
    "use strict";
    // LOGIN
    $scope.login = function () {
        $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: $scope.gebruiker.doc.gebruikersnaam, wachtwoord: $scope.gebruiker.doc.wachtwoord});
        console.log($scope.gebruiker);
    };
});

myApp.controller('samenstellenController', function ($scope, $routeParams, $location, gebruikersnaamService) {
    "use strict";
    $scope.plaatje = 'style/images/icons/muziek.png';
});


myApp.controller('myCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
    $scope.whomai = "DOOD";
});

