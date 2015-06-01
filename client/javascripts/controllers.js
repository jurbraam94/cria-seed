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
        $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: $routeParams._gebruikersnaam, wachtwoord: $routeParams._wachtwoord}, function () {
            console.log($scope.gebruiker);
        });
    };
});

/**
 * TODO: maken cirkeltje en het maken van boxen.
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
myApp.controller('samenstellenController', function ($scope, $routeParams, $location, gebruikersnaamService) {
    "use strict";



    $scope.getAllImages = function () {
        var imgArray = new Array();
        var padNaam = "style/images/icons/";
        imgArray[0] = padNaam + "muziek.png";
        imgArray[1] = padNaam + "STILTE.png";
        imgArray[2] = padNaam + "TEKST.png";
        imgArray[3] = padNaam + "CAMERA.png";
        imgArray[4] = padNaam + "VIDEO.png";
        imgArray[5] = padNaam + "BLOEMEN.png";
        imgArray[6] = padNaam + "SPREKER.png";
        imgArray[7] = padNaam + "ETEN.png";
        imgArray[8] = padNaam + "WAGEN.png";
        imgArray[9] = padNaam + "GEENINVULLING.png";

        $scope.afbeeldingen = imgArray;
    };
    var init = function () {
        $scope.getAllImages();
    };
    init();
});


myApp.controller('myCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
    $scope.whomai = "DOOD";
});

