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

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $scope.menuActive = $location.path().substring(1);
    });

});

myApp.controller('ContactController', function () {
    "use strict";
    sendMail
});

myApp.controller('GebruikerLoginController', function ($scope, $window, Api, $cookieStore) {
    "use strict";

    // LOGIN / LOGUIT
    $scope.inEnUitloggen = function (gebruiker) {
        if ($scope.loggedIn) {
            $cookieStore.remove('sessionCookie');
            $window.location.reload();
        } else {
         //   $scope.gebruiker = gebruikersnaamService.gebruiker.login({gebruikersnaam: gebruiker.gebruikersnaam, wachtwoord: gebruiker.wachtwoord}, function () {
            $scope.gebruiker = Api.gebruiker.login({gebruikersnaam: gebruiker.gebruikersnaam, wachtwoord: gebruiker.wachtwoord}, function () {
                if ($scope.gebruiker.err === undefined) {
                    $cookieStore.put('sessionCookie', $scope.gebruiker.doc.gebruikersnaam);
                    $window.location.reload();
                } else if ($scope.gebruiker.err) {
                    console.log($scope.gebruiker.err);
                    $scope.error = $scope.gebruiker.err;
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
myApp.controller('SamenstellenController', function ($scope, $routeParams, $location) {
    "use strict";
    var init;

    function logger(slice) {
        console.log("Geselecteerde slice: ", slice.innerHTML);
    }

    function addChartHandlers(chart) {
        //google.visualization.events.addListener(chart, 'select', function() {
        //    console.log("Geselecteerde slice: ", chart.getSelection());
        //});
        var slices, i;

        slices = document.getElementsByTagName("g");

        for (i = 1; i < slices.length; i += 1) {
            slices[i].addEventListener("click", logger(slices[i]));
        }
    }

    function drawChart() {
        var data = google.visualization.arrayToDataTable([
            ['Segment', 'Minuten'], //minuten in variabelen?
            ['Muziek', 11],
            ['Stilte', 2],
            ['Berichten', 2],
            ["Foto's", 2],
            ["Video's", 7],
            ['Bloemen', 2],
            ['Spreker', 2],
            ['Eten', 2],
            ['Rouwstoet', 2],
            ['Overig', 2]
        ]),
            options = {
                chartArea: { left: '5%', right: '0', width: '100%', height: '100%' },
                legend: { position: 'right', alignment: 'center' }
            },
            chart = new google.visualization.PieChart(document.getElementById('piechart'));

        addChartHandlers(chart);

        chart.draw(data, options);
    }

    drawChart();
    google.setOnLoadCallback(drawChart());

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
