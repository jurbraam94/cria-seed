/*jslint node: true */
/*globals myApp */

/**
 * TODO: create controller for retrieving 1 book, create and delete
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
myApp.controller('GebruikerLoginController', function ($scope, $routeParams, $location, gebruikersnaamService, $cookieStore) {
    "use strict";
    // LOGIN
    $scope.login = function (gebruiker) {
        $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: gebruiker.gebruikersnaam, wachtwoord: gebruiker.wachtwoord}, function () {
            console.log($scope.gebruiker);
            if ($scope.gebruiker !== null) {
                $cookieStore.put('sessionCookie', $scope.gebruiker);
            }
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
myApp.controller('SamenstellenController', function ($scope, $routeParams, $location, gebruikersnaamService) {
    "use strict";



    $scope.getAllImages = function () {
        var imgArray = [],
            padNaam = "style/images/icons/";
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
