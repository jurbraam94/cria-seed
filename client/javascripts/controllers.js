/*jslint node: true */
/*globals myApp, google, drawChart*/

myApp.controller('MainController', function ($scope, $rootScope, $location, $cookieStore) {
    "use strict";

    if ($cookieStore.get('sessionCookie')) {
        $scope.loggedIn = true;
        $scope.gebruikersNaam = $cookieStore.get('sessionCookie');
    } else {
        $scope.loggedIn = false;
    }

    if ($scope.gebruikersNaam) {
        $scope.login = "Welkom " + $scope.gebruikersNaam;
    } else {
        $scope.login = "Inloggen";
    }

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $scope.menuActive = $location.path().substring(1);
    });

});

myApp.controller('GebruikerLoginController', function ($scope, $window, gebruikersnaamService, $cookieStore) {
    "use strict";

    // LOGIN / LOGUIT
    $scope.inEnUitloggen = function (gebruiker) {
        if ($scope.loggedIn) {
            $cookieStore.remove('sessionCookie');
            $window.location.reload();
        } else {
            $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: gebruiker.gebruikersnaam, wachtwoord: gebruiker.wachtwoord}, function () {
                if ($scope.gebruiker.err === null) {
                    $cookieStore.put('sessionCookie', $scope.gebruiker.doc.gebruikersnaam);
                    $window.location.reload();
                }
            });
        }
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
                chartArea: { left: '5%', right: '0', width: '90%', height: '90%' },
                legend: { position: 'none' }
            },
            chart = new google.visualization.PieChart(document.getElementById('piechart'));

        chart.draw(data, options);
    }

    google.setOnLoadCallback(drawChart);

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
