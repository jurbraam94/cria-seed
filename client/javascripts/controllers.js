/*jslint node: true */
/*globals myApp, google, drawChart, angular, window*/

myApp.controller('MainController', function ($scope, $rootScope, $location, DOODService, $route, $window) {
    "use strict";

    $scope.goto = function (location) {
        $location.path('/' + location);
    };

    $scope.pageName = function () {
        return $location.path();
    };

    //Only for use on views, if you want to check if a user is logged in in a controller please call the doodservice gebruikerssessie get function.
    $scope.initGebruiker = function () {
        var sessie = DOODService.gebruikerSessie.get(function () {
            if (sessie.doc.gebruikersnaam !== undefined) {
                $scope.loggedIn = true;
                $scope.gebruikersNaam = sessie.doc.gebruikersnaam;
            } else {
                $scope.loggedIn = false;
            }
        });
    };

    $rootScope.$on('$routeChangeSuccess', function (e, curr, prev) {
        $scope.menuActive = $scope.pageName().substring(1);
    });
});

myApp.controller('ContactController', function ($scope, DOODService) {
    "use strict";
    $scope.contact = function (contactGegevens) {
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

myApp.controller('formulierController', function ($scope) {
    "use strict";
    console.log('formuliercontroller geladen');
});

myApp.controller('GebruikerLoginController', function ($scope, DOODService, $route) {
    "use strict";

    // LOGIN / LOGUIT
    $scope.inEnUitloggen = function (gebruiker) {
        var sessie = DOODService.gebruikerSessie.get(function () {
            if (sessie.doc.gebruikersnaam !== undefined) {
                DOODService.gebruikerLoguit.post(function () {
                    $scope.goto('overzicht');
                });
            } else {
                $scope.gebruiker = DOODService.gebruikerLogin.post(gebruiker, function () {
                    if ($scope.gebruiker.err === undefined) {
                        $scope.goto('overzicht');
                    } else if ($scope.gebruiker.err) {
                        $scope.error = $scope.gebruiker.err;
                    }
                });
            }
        });
    };
});

/**
 * Samenstellen controller
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
myApp.controller('SamenstellenController', function ($scope, DOODService, $routeParams, $location) {
    "use strict";
    var totaleTijd,
        dataTable,
        kleuren = [], // = ['#afafaf']
        chart = null,
        muisOverIndex,

        initieeleDataTable = function (segmenten) {
            var i;
            dataTable = [['Segment', 'Minuten']];

            for (i = 0; i < segmenten.doc.length; i += 1) {
                dataTable.push([segmenten.doc[i].object, segmenten.doc[i].percentage]);
            }

            dataTable.push(['Overige tijd', 0]);
        },

        maakObject = function (gebruikersnaam, i, callback) {
            $scope.segmenten = DOODService.uitvaartSegmentPost.post({gebruikersnaam: gebruikersnaam, object: dataTable[i][0], percentage: dataTable[i][1], volgnummer: i},
                function () {
                    if ($scope.segmenten.err === null) {
                        //belt terug als het segment verwijderd en opnieuw gepost is
                        callback();
                    }
                    $scope.error = $scope.segmenten.err;
                });
        },

        stuurDataTableNaarDb = function () {
            var i = 1,
                stuurDataLoop = function (gebruikersnaam) {
                    maakObject(gebruikersnaam, i, function () {
                        i += 1;
                        if (i < dataTable.length - 1) {
                            stuurDataLoop(gebruikersnaam);
                        }
                    });
                },
                gebruiker = DOODService.gebruikerSessie.get(function () {
                    if (gebruiker.doc.gebruikersnaam !== undefined) {
                        $scope.verwijderAlleSegmenten = DOODService.uitvaartSegmentenVerwijderen.delete({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                            if ($scope.verwijderAlleSegmenten.err === null) {
                                stuurDataLoop(gebruiker.doc.gebruikersnaam);
                            }
                        });
                    }
                });
        },

        getTijdsduurUitDb = function (callback) {
            var gebruiker;
            gebruiker = DOODService.gebruikerSessie.get(function () {
                if (gebruiker.doc.gebruikersnaam !== undefined) {
                    $scope.uitvaartSamenstellen = DOODService.uitvaartSamenstellen.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                        if ($scope.uitvaartSamenstellen.err === null) {
                            totaleTijd = $scope.uitvaartSamenstellen.doc.tijdsduur;
                            if (totaleTijd === undefined) {
                                totaleTijd = 90;
                            }
                            callback();
                        }
                        $scope.error = $scope.uitvaartSamenstellen.err;
                    });
                }
            });
        },

        getDataTableUitDb = function getDataTableUitDb(callback) {
            var gebruiker;
            gebruiker = DOODService.gebruikerSessie.get(function () {
                if (gebruiker.doc.gebruikersnaam !== undefined) {
                    var segmenten = DOODService.uitvaartSegmentLijst.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                        if (segmenten.err === null) {
                            initieeleDataTable(segmenten);
                            callback();
                        }
                        $scope.error = segmenten.err;
                    });
                }
            });
        },

        getTotaleTijdEnIndexVanOverigeTijd = function () {
            var i, overigeTijdIndex, echteTotaleTijd = 0;
            for (i = 1; i < dataTable.length; i += 1) {
                if (dataTable[i][0] !== "Overige tijd") {
                    echteTotaleTijd += dataTable[i][1];
                } else {
                    overigeTijdIndex = i;
                }
            }
            return [echteTotaleTijd, overigeTijdIndex];
        },

    // deze functie aanroepen om de totale tijd en overige tijd te regelen
    // op deze manier: berekenTijden(getTotaleTijdEnIndexVanOverigeTijd());
        berekenTijden = function (tijden) {
            if (totaleTijd < tijden[0]) {
                totaleTijd = tijden[0];
            }
            dataTable[tijden[1]][1] = totaleTijd - tijden[0];
            $scope.totaleTijd = totaleTijd;
        },

        getSliceIndex = function (e) {
            muisOverIndex = e.row;
        },

        mouseDownOnSlice = function (e) {
            chart.setSelection([{ row: muisOverIndex, column: null }]);
        },

        swapArrayIndexen = function (array, oudeIndex, nieuweIndex) {
            var temp;

            temp = array[oudeIndex];
            array[oudeIndex] = array[nieuweIndex];
            array[nieuweIndex] = temp;

            return array;
        },

        redrawNaHerordenen = function (oudeIndex, nieuweIndex) {
            //swap indexen in dataTable
            dataTable = swapArrayIndexen(dataTable, oudeIndex, nieuweIndex);

            //kleuren ook swappen
            kleuren = swapArrayIndexen(kleuren, oudeIndex - 1, nieuweIndex - 1);

            //chart opnieuw tekenen
            drawChart(true);
        },

        verplaatsSlice = function (e) {
            var oudeIndex = chart.getSelection()[0].row + 1, nieuweIndex = muisOverIndex + 1;

            //check index != gelijk aan oude index
            if (nieuweIndex !== oudeIndex) {
                redrawNaHerordenen(oudeIndex, nieuweIndex);
            }
        },

        genereerKleurcodes = function () {
            var i, j;

            for (i = 1; i < dataTable.length; i += 1) {
                j = i - 1;
                if (dataTable[i][0] === 'Overige tijd') {
                    kleuren[j] = '#afafaf';
                    console.log("Overige tijd(?) kleur van ", dataTable[i][0], " is nu ", kleuren[j]);
                } else if ((kleuren[j] === undefined) || (kleuren[j] === null)) {
                    kleuren[j] = '#' + Math.random().toString(16).slice(2, 8);
                    console.log("kleur van ", dataTable[i][0], " is nu ", kleuren[j]);
                }
            }
        },

        chartActies = function (id, nieuweWaarde) {
            chart.setAction({
                id: id,
                text: id,
                action: function () {
                    var index = chart.getSelection()[0].row + 1;
                    if (nieuweWaarde === 0) {
                        dataTable[index][1] = 0;
                        dataTable.splice(index, 1);
                        kleuren.splice(index, 1);
                    } else {
                        dataTable[index][1] += nieuweWaarde;
                    }
                    drawChart(true);
                }
            });
        },

        drawChart = function (changed) {
            var data, options;

            genereerKleurcodes(changed);
            options = {
                chartArea: { left: '5%', right: '0', width: '100%', height: '100%' },
                legend: { position: 'right', alignment: 'center' },
                pieSliceText: "value",
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

            if (changed) {
                //send datatable naar db als er iets veranderd is.
                stuurDataTableNaarDb();
            }
        };

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

    $scope.totaleTijdAanpassen = function (tijd) {
        var gebruiker;
        totaleTijd = tijd;

        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                $scope.updateTijdsduur = DOODService.uitvaartSamenstellen.update({gebruikersnaam: gebruiker.doc.gebruikersnaam, tijdsduur: tijd}, function () {
                    if ($scope.updateTijdsduur.err === null) {
                        drawChart();
                    }
                });
            }
        });
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

    $scope.init = function () {
        $scope.getAllImages();
        //totale tijd uit db laden
        getTijdsduurUitDb(function () {
            //segmenten uit db laden
            getDataTableUitDb(function () {
                //pie chart tekenen
                drawChart(false);
            });
        });
    };

    window.onresize = function () {
        drawChart();
    };
});



myApp.controller('muziekController', function ($scope, DOODService, Spotify) {
    "use strict";

    var voegLiedjeToe = function (titel, artiest) {
        $scope.zoekResultaat.push({artiest: artiest, titel: titel});
    };

    $scope.muziekDb =  [
        {artiest: "Coon", titel: "Million miles"},
        {artiest: "Adele", titel:  "Rain"},
        {artiest: "Diggy Dex", titel: "De vallende sterren"},
        {artiest: "one republic", titel: "Counting stars"}
    ];

    $scope.zoekResultaat = [];
    $scope.afspeellijst = [];

    $scope.voegToeBijAfspeellijst = function (artiest, titel) {
        var liedInAfspeelLijst = [];
        liedInAfspeelLijst = [{
            artiest: artiest,
            titel: titel
        }];

        console.log(liedInAfspeelLijst, artiest, titel);
        $scope.afspeellijst.unshift(liedInAfspeelLijst);
    };

    $scope.zoek = function (zoekopdracht) {
        $scope.error = "Vul een titel";
        if (zoekopdracht !== "") {
            if ($scope.zoekResultaat !== null) {
                $scope.zoekResultaat = [];
            }
            Spotify.search(zoekopdracht, 'track', {limit: 20}).then(function (data) {
                angular.forEach(data.tracks.items, function (items) {
                    voegLiedjeToe(items.name, items.artists[0].name);
                });
            });
            console.log($scope.zoekResultaat, "-------------");
        } else {
            $scope.error = "Vul een titel in";
        }
    };

});

