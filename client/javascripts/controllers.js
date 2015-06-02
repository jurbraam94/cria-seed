/*jslint node: true */
/*globals myApp, google, drawChart*/

/**
 * TODO: create controller for retrieving 1 book, create and delete
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
myApp.controller('GebruikerLoginController', function ($scope, $routeParams, $location, gebruikersnaamService, $cookieStore) {
    "use strict";

    if ($cookieStore.get('sessionCookie') !== undefined) {
        $scope.loggedIn = true;
        $scope.gebruikersNaam = $cookieStore.get('sessionCookie');
    } else {
        $scope.loggedIn = false;
    }

    // LOGIN
    $scope.login = function (gebruiker) {
        $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: gebruiker.gebruikersnaam, wachtwoord: gebruiker.wachtwoord}, function () {
            console.log($scope.gebruiker.doc.gebruikersnaam + ' is ingelogd.');
            if ($scope.gebruiker !== null) {
                $cookieStore.put('sessionCookie', $scope.gebruiker.doc.gebruikersnaam);
                $scope.loggedIn = true;
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
    var init;

    google.setOnLoadCallback(drawChart);
    function drawChart() {

        var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Work',     11],
            ['Eat',      2],
            ['Commute',  2],
            ['Watch TV', 2],
            ['Sleep',    7]
        ]),
            options = {
                title: 'My Daily Activities'
            },
            chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

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

    init = function () {
        $scope.getAllImages();
    };

    init();
});
