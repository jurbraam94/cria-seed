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

myApp.controller('ContactController', function ($scope, Api) {
    "use strict";
    $scope.contact = function (contact) {
        $scope.mail = Api.contact.mail(contact, function () {
            if ($scope.mail.err) {
                $scope.success = false;
                $scope.error = $scope.mail.err;
            } else if ($scope.mail.doc !== null) {
                $scope.success = true;
            }
        });
    };
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
    var init,
        dataTable = [
            ['Segment', 'Minuten'],
            ['Muziek', 11],
            ['Stilte', 2],
            ['Berichten', 5],
            ["Foto's", 3],
            ["Video's", 7],
            ['Bloemen', 6],
            ['Spreker', 1],
            ['Eten', 8],
            ['Rouwstoet', 4],
            ['Overig', 9]
        ],
        kleuren = ['#000099', '#ef4338', '#639d41', '#ff853d', '#6be7fe', '#ffbbee', '#1e3e4a', '#92183a', '#c30a55', '#4f9d97'],
        chart = null,
        muisOverIndex;

    function getSliceIndex(e) {
        muisOverIndex = e.row;
    }

    function mouseDownOnSlice(e) {
        chart.setSelection([{ row: muisOverIndex, column: null }]);
        //console.log("Geselecteerde slice: ", chart.getSelection()[0].row);
    }

    function redrawNaHerordenen(oudeIndex, nieuweIndex) {
        var temp, temp2;
        //swap indexen in array
        //$scope.segmenten
        temp = dataTable[oudeIndex];
        dataTable[oudeIndex] = dataTable[nieuweIndex];
        dataTable[nieuweIndex] = temp;

        //kleuren meenemen
        temp2 = kleuren[oudeIndex - 1];
        kleuren[oudeIndex - 1] = kleuren[nieuweIndex - 1];
        kleuren[nieuweIndex - 1] = temp2;

        //chart opnieuw tekenen
        drawChart();
    }

    function verplaatsSlice(e) {
        var oudeIndex = chart.getSelection()[0].row + 1, nieuweIndex = muisOverIndex + 1;
        //console.log("muisOverIndex: ", muisOverIndex);

        //check index != gelijk aan oude
        if (nieuweIndex !== oudeIndex) {
            redrawNaHerordenen(oudeIndex, nieuweIndex);
        }
    }

    function drawChart() {
        var data = google.visualization.arrayToDataTable(dataTable),
            options = {
                chartArea: { left: '5%', right: '0', width: '100%', height: '100%' },
                legend: { position: 'right', alignment: 'center' },
                colors: kleuren,
                backgroundColor: { fill: '#48cec2' }
            },
            chartParentNode = document.getElementById('piechart').parentNode;

        if (chart !== null) {
            document.getElementById('piechart').remove();
            chart = document.createElement('div');
            chart.id = "piechart";
            chartParentNode.appendChild(chart);
        }

        chart = new google.visualization.PieChart(document.getElementById('piechart'));

        // Event listeners
        google.visualization.events.addListener(chart, 'onmousedown', mouseDownOnSlice);
        google.visualization.events.addListener(chart, 'onmouseover', getSliceIndex);
        google.visualization.events.addListener(chart, 'onmouseup', verplaatsSlice);

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
