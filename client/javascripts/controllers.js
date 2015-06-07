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
            ['Overige tijd', 1]
        ],
        kleuren = ['#000099'],
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

    // deze functie aanroepen om de totale tijd en overige tijd te regelen
    // op deze manier: berekenTijden(getTotaleTijdEnIndexVanOverigeTijd());
    function berekenTijden(tijden) {
        if (totaleTijd < tijden[0]) {
            totaleTijd = tijden[0];
        }

        dataTable[tijden[1]][1] = totaleTijd - tijden[0];
        $scope.totaleTijd = totaleTijd;
    }

    function getSliceIndex(e) {
        muisOverIndex = e.row;
    }

    function mouseDownOnSlice(e) {
        chart.setSelection([{ row: muisOverIndex, column: null }]);
    }

    function swapArrayIndexen(array, oudeIndex, nieuweIndex) {
        var temp;

        temp = array[oudeIndex];
        array[oudeIndex] = array[nieuweIndex];
        array[nieuweIndex] = temp;

        return array;
    }

    function redrawNaHerordenen(oudeIndex, nieuweIndex) {
        //swap indexen in dataTable
        dataTable = swapArrayIndexen(dataTable, oudeIndex, nieuweIndex);

        //kleuren ook swappen
        kleuren = swapArrayIndexen(kleuren, oudeIndex - 1, nieuweIndex - 1);

        //chart opnieuw tekenen
        drawChart();
    }

    function verplaatsSlice(e) {
        var oudeIndex = chart.getSelection()[0].row + 1, nieuweIndex = muisOverIndex + 1;

        //check index != gelijk aan oude index
        if (nieuweIndex !== oudeIndex) {
            redrawNaHerordenen(oudeIndex, nieuweIndex);
        }
    }

    // bron: https://github.com/fatlinesofcode/ngDraggable
    // wordt aangeroepen als er een segment op de piechart word gedropt:
    $scope.onDropComplete = function (data, event) {
        var i, standaardTijd = 10;
        for (i = 0; i < $scope.afbeeldingen.length; i += 1) {
            if (data === $scope.afbeeldingen[i].id) {
                dataTable.push([data, standaardTijd]);
            }
        }
        redrawNaHerordenen(dataTable.length - 1, dataTable.length - 2);
    };

    function genereerKleurcodes() {
        var i;
        for (i = 0; i < (dataTable.length - 1); i += 1) {
            if (kleuren[i] === null || kleuren[i] === undefined) {
                kleuren[i] = '#' + Math.random().toString(16).slice(2, 8);
            }
        }
    }

    function chartActies(id, nieuweWaarde) {
        chart.setAction({
            id: id,
            text: id,
            action: function() {
                var index = chart.getSelection()[0].row + 1;
                if (nieuweWaarde === 0) {
                    dataTable[index][1] = 0;
                } else {
                    dataTable[index][1] += nieuweWaarde;
                }
                drawChart();
            }
        });
    }

    function drawChart() {
        var data, options, i;

        // data uit db laden

        genereerKleurcodes();
        options = {
            chartArea: { left: '5%', right: '0', width: '100%', height: '100%' },
            legend: { position: 'right', alignment: 'center' },
            colors: kleuren,
            tooltip: { trigger: 'selection' },
            backgroundColor: { fill: '#48CEC2' }
        };

        // data
        berekenTijden(getTotaleTijdEnIndexVanOverigeTijd());
        data = google.visualization.arrayToDataTable(dataTable);

        if (chart !== null) {
            chart = document.getElementById("piechart");
            chart.removeChild(chart.firstChild);
        }

        chart = new google.visualization.PieChart(document.getElementById('piechart'));

        // Event listeners
        google.visualization.events.addListener(chart, 'onmousedown', mouseDownOnSlice);
        google.visualization.events.addListener(chart, 'onmouseover', getSliceIndex);
        google.visualization.events.addListener(chart, 'onmouseup', verplaatsSlice);

        chartActies("verhoog", 1);
        chartActies("verlaag", -1);
        chartActies("verwijder", 0);

        chart.draw(data, options);
    }

    // Dit moet van google. Waarom? Goeie vraag
    google.setOnLoadCallback(drawChart);

    $scope.totaleTijdAanpassen = function (tijd) {
        totaleTijd = tijd;
        drawChart();
    };

    $scope.getAllImages = function () {
        var imgArray = [],
            padNaam = "style/images/icons/";
        imgArray[0] = { src: padNaam + "muziek.png", id: "Muziek" };
        imgArray[1] = { src: padNaam + "STILTE.png", id: "Stilte" };
        imgArray[2] = { src: padNaam + "TEKST.png", id: "Berichten" };
        imgArray[3] = { src: padNaam + "CAMERA.png", id: "Foto's" };
        imgArray[4] = { src: padNaam + "VIDEO.png", id: "Video's" };
        imgArray[5] = { src: padNaam + "BLOEMEN.png", id: "Bloemen" };
        imgArray[6] = { src: padNaam + "SPREKER.png", id: "Spreker" };
        imgArray[7] = { src: padNaam + "ETEN.png", id: "Eten" };
        imgArray[8] = { src: padNaam + "WAGEN.png", id: "Rouwstoet" };
        imgArray[9] = { src: padNaam + "GEENINVULLING.png", id: "Wishlist" };

        $scope.afbeeldingen = imgArray;
    };

    init = function () {
        $scope.getAllImages();
        drawChart();
    };

    init();

    window.onresize = function () {
        drawChart();
    };
});
