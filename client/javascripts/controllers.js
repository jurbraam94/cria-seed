/*jslint node: true */
/*globals myApp, google, drawChart, angular*/

myApp.controller('MainController', function ($scope, $rootScope, $location, $cookieStore, $window) {
    "use strict";

    $scope.goto = function (location) {
        $window.location.assign('#/' + location);
        $window.location.reload(true);
    };

    $scope.pageName = function () { return $location.path(); };

    if ($cookieStore.get('sessionCookie')) {
        $scope.loggedIn = true;
        $scope.gebruikersNaam = $cookieStore.get('sessionCookie');
    } else {
        $scope.loggedIn = false;
    }

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $scope.menuActive = $scope.pageName().substring(1);
    });
});

myApp.controller('ContactController', function ($scope, DOODService) {
    "use strict";
    $scope.contact = function (contactGegevens) {
        console.log(contactGegevens);
        $scope.mail = DOODService.contact.post(contactGegevens, function () {
            if ($scope.mail.err) {
                $scope.success = false;
                $scope.error = $scope.mail.err;
            } else if ($scope.mail.doc !== null) {
                $scope.contactForm.$setPristine();
                $scope.success = true;
            }
        });
    };
});

myApp.controller('GebruikerLoginController', function ($scope, $window, DOODService, $cookieStore) {
    "use strict";

    // LOGIN / LOGUIT
    $scope.inEnUitloggen = function (gebruiker) {
        if ($scope.loggedIn) {
            $cookieStore.remove('sessionCookie');
            $scope.goto('login');
        } else {
            if (gebruiker.gebruikersnaam === "test" && gebruiker.wachtwoord === "test") {
                // Sets loggedin as test for local testing.
                $cookieStore.put('sessionCookie', gebruiker.gebruikersnaam);
                $scope.goto('overzicht');
            }
            $scope.gebruiker = DOODService.login.post(gebruiker, function () {
                if ($scope.gebruiker.err === undefined) {
                    $cookieStore.put('sessionCookie', $scope.gebruiker.doc.gebruikersnaam);
                    $scope.goto('overzicht');
                } else if ($scope.gebruiker.err) {
                    $scope.error = $scope.gebruiker.err;
                }
            });
        }
    };
});

/**
 * Samenstellen controller
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
myApp.controller('SamenstellenController', function ($scope, $routeParams, $location) {
    "use strict";
    var init,
        totaleTijd = 90,
        dataTable = [
            ['Segment', 'Minuten'],
            ['Muziek', 11],
            ['Stilte', 2],
            ['Berichten', 5],
            ["Foto's", 8],
            ["Video's", 7],
            ['Bloemen', 3],
            ['Spreker', 4],
            ['Eten', 9],
            ['Rouwstoet', 15],
            ['Wishlist', 19],
            ['Overige tijd', 13]
        ],
        kleuren = ['#000099', '#ef4338', '#639d41', '#ff853d', '#6be7fe', '#ffbbee', '#1e3e4a', '#92183a', '#c30a55', '#4f9d97', '#D3D3D3'],
        chart = null,
        muisOverIndex;

    function getTotaleTijdEnIndexVanOverigeTijd() {
        var i, overigeTijdIndex, echteTotaleTijd = 0;
        for (i = 1; i < dataTable.length; i += 1) {
            if (dataTable[i][0] !== "Overige tijd") {
                echteTotaleTijd += dataTable[i][1];
            } else {
                overigeTijdIndex = i;
            }
        }

        return [echteTotaleTijd, overigeTijdIndex];
    }

    // deze functie moet aangeroepen worden in drawChart en in $scope.totaleTijdAanpassen
    // op deze manier: berekenTijden(getTotaleTijdEnIndexVanOverigeTijd());
    function berekenTijden(tijden) {
        dataTable[tijden[1]][1] = totaleTijd - tijden[0];

        if (totaleTijd < tijden[0]) {
            totaleTijd = tijden[0];
        }
        $scope.totaleTijd = totaleTijd;
    }

    $scope.boxObjecten = {
        src: "path/muziek.png",
        object: "muziek",
        percentage: 1
    };

    $scope.segmenten = [];

    $scope.addSegment = function (segment) {
        if (angular.isObject(segment)) {
            $scope.segmenten[$scope.segmenten.length + 1] = segment;
        } else {
            console.log("Je hebt geen object toegevoegd");
        }
    };

    function getSliceIndex(e) {
        muisOverIndex = e.row;
    }

    function mouseDownOnSlice(e) {
        chart.setSelection([{ row: muisOverIndex, column: null }]);
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

        //check index != gelijk aan oude
        if (nieuweIndex !== oudeIndex) {
            redrawNaHerordenen(oudeIndex, nieuweIndex);
        }
    }

    function drawChart() {
        var data,
            options = {
                chartArea: { left: '5%', right: '0', width: '100%', height: '100%' },
                legend: { position: 'right', alignment: 'center' },
                colors: kleuren,
                backgroundColor: { fill: '#f0f0f0' }
            },
            chartParentNode = document.getElementById('piechart').parentNode;

        // data
        //$scope.totaleTijd = totaleTijd; //staat nu in getTotaleTijdEnIndexVanOverigeTijd
        berekenTijden(getTotaleTijdEnIndexVanOverigeTijd());
        data = google.visualization.arrayToDataTable(dataTable);

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
    google.setOnLoadCallback(drawChart);

    $scope.totaleTijdAanpassen = function (tijd) {
        totaleTijd = tijd;
        berekenTijden(getTotaleTijdEnIndexVanOverigeTijd());
        drawChart();
    };

    $scope.drag = function () {
        console.log("nice je hebt erop geklikt");
    };

    $scope.getAllImages = function () {
        var imgArray = [],
            padNaam = "style/images/icons/";
        imgArray[0] = { src: padNaam + "muziek.png", id: "segment1" };
        imgArray[1] = { src: padNaam + "STILTE.png", id: "segment2" };
        imgArray[2] = { src: padNaam + "TEKST.png", id: "segment3" };
        imgArray[3] = { src: padNaam + "CAMERA.png", id: "segment4" };
        imgArray[4] = { src: padNaam + "VIDEO.png", id: "segment5" };
        imgArray[5] = { src: padNaam + "BLOEMEN.png", id: "segment6" };
        imgArray[6] = { src: padNaam + "SPREKER.png", id: "segment7" };
        imgArray[7] = { src: padNaam + "ETEN.png", id: "segment8" };
        imgArray[8] = { src: padNaam + "WAGEN.png", id: "segment9" };
        imgArray[9] = { src: padNaam + "GEENINVULLING.png", id: "segment10" };

        $scope.afbeeldingen = imgArray;
    };

    init = function () {
        $scope.getAllImages();
    };

    init();

    window.onresize = function () {
        drawChart();
    };
});
