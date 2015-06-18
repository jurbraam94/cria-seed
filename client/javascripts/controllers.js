/*jslint node: true */
/*globals myApp, document, place, google, drawChart, angular, window*/

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

myApp.controller('ContactController', function ($scope, DOODService, $timeout) {
    "use strict";
    $scope.contact = function (contactGegevens) {
        $scope.mail = DOODService.contact.post(contactGegevens, function () {
            if ($scope.mail.err) {
                $scope.error = $scope.mail.err;
            } else if ($scope.mail.doc !== null) {
                $scope.contactForm.$setPristine();
                $scope.success = "Bedankt, we hebben uw mail succesvol ontvangen.";
                $timeout(function () {
                    $scope.success = null;
                }, 3000);
            }
        });
    };
});

myApp.controller('formulierController', function ($scope, DOODService, $timeout, $route, $rootScope) {
    "use strict";
    var gebruiker, aanvullendeGegevensGet, algemeneGegevensGet, uitvaartGet, events;
    $scope.formulierData = {aanvullendeGegevens: {}, algemeneGegevens: {}, uitvaart: {}};
    $scope.formulierData.pagina = "gegevens";

    $scope.initFormulierGegevens = function () {
        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                aanvullendeGegevensGet = DOODService.aanvullendeGegevens.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                    if (aanvullendeGegevensGet.doc !== null) {
                        $scope.formulierData.aanvullendeGegevens = aanvullendeGegevensGet.doc;
                    } else {
                        DOODService.aanvullendeGegevensPost.post({gebruikersnaam: gebruiker.doc.gebruikersnaam});
                    }
                });

                algemeneGegevensGet = DOODService.algemeneGegevens.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                    if (algemeneGegevensGet.doc !== null) {
                        $scope.formulierData.algemeneGegevens = algemeneGegevensGet.doc;
                    } else {
                        DOODService.algemeneGegevensPost.post({gebruikersnaam: gebruiker.doc.gebruikersnaam});
                    }
                });

                uitvaartGet = DOODService.uitvaart.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                    var locatie;
                    if (uitvaartGet.doc !== null) {
                        if (uitvaartGet.doc.locatie !== undefined) {
                            $scope.formulierData.uitvaart = uitvaartGet.doc;
                            locatie = uitvaartGet.doc.locatie.split(",");

                            //google maps stuff
                            $scope.map = {
                                "center": {
                                    latitude: locatie[0],
                                    longitude:  locatie[1]
                                },
                                "zoom": 15
                            };
                            $scope.marker = {
                                id: 0,
                                coords: {
                                    latitude: locatie[0],
                                    longitude: locatie[1]
                                },
                                options: { draggable: true },
                                events: {
                                    dragend: function (marker, eventName, args) {

                                        $scope.marker.options = {
                                            draggable: true,
                                            labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                                            labelAnchor: "100 0",
                                            labelClass: "marker-labels"
                                        };
                                    }
                                }
                            };
                        }
                    } else {
                        DOODService.uitvaartPost.post({gebruikersnaam: gebruiker.doc.gebruikersnaam});
                    }
                });
            }
        });
    };

    $scope.opslaan = function () {
        var uitvaart, algemeneGegevens, aanvullendeGegevens;
        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                uitvaart = DOODService.uitvaart.update({gebruikersnaam: gebruiker.doc.gebruikersnaam, duurOpbaring: $scope.formulierData.uitvaart.duurOpbaring, locatie: $scope.formulierData.uitvaart.locatie, beschrijvingOpbaring: $scope.formulierData.uitvaart.beschrijvingOpbaring}, function () {
                    if (uitvaart.err !== null) {
                        $scope.error = "Fout: " + uitvaart.err;
                    } else {
                        algemeneGegevens = DOODService.algemeneGegevens.update({gebruikersnaam: gebruiker.doc.gebruikersnaam, voornaam: $scope.formulierData.algemeneGegevens.voornaam, achternaam: $scope.formulierData.algemeneGegevens.achternaam, woonplaats: $scope.formulierData.algemeneGegevens.woonplaats, postcode: $scope.formulierData.algemeneGegevens.postcode, adres: $scope.formulierData.algemeneGegevens.adres, huisnummer: $scope.formulierData.algemeneGegevens.huisnummer, telefoon: $scope.formulierData.algemeneGegevens.telefoon, email: $scope.formulierData.algemeneGegevens.email}, function () {
                            if (algemeneGegevens.err !== null) {
                                $scope.error =  "Fout: " + algemeneGegevens.err;
                            } else {
                                aanvullendeGegevens = DOODService.aanvullendeGegevens.update({gebruikersnaam: gebruiker.doc.gebruikersnaam, religie: $scope.formulierData.aanvullendeGegevens.religie, donor: $scope.formulierData.aanvullendeGegevens.donor}, function () {
                                    if (aanvullendeGegevens.err !== null) {
                                        $scope.error = "Fout: " + aanvullendeGegevens.err;
                                    } else {
                                        $scope.formulierPaginaForm.$setPristine();
                                        $scope.success = "Alle data is succesvol opgeslagen.";
                                        $timeout(function () {
                                            $scope.success = null;
                                        }, 4000);
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    };

    $scope.map = {
        "center": {
            latitude: 51.98891,
            longitude: 5.94929
        },
        "zoom": 100
    };
    $scope.marker = {
        id: 0,
        coords: {
            latitude: 51.98891,
            longitude: 5.94929
        },
        options: { draggable: true },
        events: {
            dragend: function (marker, eventName, args) {

                $scope.marker.options = {
                    draggable: true,
                    labelContent: "lat: " + $scope.marker.coords.latitude + ' ' + 'lon: ' + $scope.marker.coords.longitude,
                    labelAnchor: "100 0",
                    labelClass: "marker-labels"
                };
            }
        }
    };

    events = {
        places_changed: function (searchBox) {

            var place = searchBox.getPlaces();
            if (!place || place === 'undefined' || place.length === 0) {
                console.log('no place data :(');
                return;
            }

            $scope.formulierData.uitvaart.locatie = place[0].geometry.location.lat() + "," + place[0].geometry.location.lng();

            $scope.map = {
                "center": {
                    "latitude": place[0].geometry.location.lat(),
                    "longitude": place[0].geometry.location.lng()
                },
                "zoom": 18
            };
            $scope.marker = {
                id: 0,
                coords: {
                    latitude: place[0].geometry.location.lat(),
                    longitude: place[0].geometry.location.lng()
                }
            };
        },
        dragend: function (marker) {
            $rootScope.$apply(function () {
                $scope.formulierData.uitvaart.locatie = marker.position.lat() + "," + marker.position.lng();
            });
        }
    };
    $scope.searchbox = { template: 'searchbox.tpl.html', events: events };
});

myApp.controller('GebruikerLoginController', function ($scope, DOODService, $timeout) {
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
                        $timeout(function () {
                            $scope.error = null;
                        }, 3000);
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
        kleuren = [],
        chart = null,
        muisOverIndex,

        initieeleDataTable = function (segmenten) {
            var i = 0;
            dataTable = [['Segment', 'Minuten']];

            while (dataTable.length <= segmenten.doc.length) {
                if (i === (segmenten.doc[i].volgnummer - 1)) {
                    dataTable.push([segmenten.doc[i].object, segmenten.doc[i].percentage]);
                    console.log("volgnummer = ", segmenten.doc[i].volgnummer);
                    console.log("pushed to table = ", [segmenten.doc[i].object, segmenten.doc[i].percentage]);
                }

                if (i === segmenten.doc.length) {
                    i = 0;
                } else {
                    i += 1;
                }
            }

            console.log("dataTable 1 = ", dataTable);

            if (dataTable.length === 1) {
                console.log("I fukt it lolz");
                dataTable.push(['Overige tijd', 0]);
            }

            console.log("dataTable 2 = ", dataTable);
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
                        if (i < dataTable.length) {
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
                        if ($scope.uitvaartSamenstellen.doc !== null) {
                            totaleTijd = $scope.uitvaartSamenstellen.doc.tijdsduur;
                            callback();
                        } else if ($scope.uitvaartSamenstellen.doc === null) {
                            DOODService.uitvaartSamenstellenPost.post({gebruikersnaam: gebruiker.doc.gebruikersnaam, tijdsduur: 60}, function () {
                                totaleTijd = 60;//default
                                callback();
                            });
                        }
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
            if (tijden[1] === undefined) {
                dataTable.push(['Overige tijd', totaleTijd - tijden[0]]);
            } else {
                dataTable[tijden[1]][1] = totaleTijd - tijden[0];
            }
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
                } else if ((kleuren[j] === undefined) || (kleuren[j] === null)) {
                    kleuren[j] = '#' + Math.random().toString(16).slice(2, 8);
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

myApp.controller('wishlistController', function ($scope, DOODService, $timeout) {
    "use strict";
    var gebruiker, bericht;
    $scope.init = function () {
        var berichten;

        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                berichten = DOODService.wishlist.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                    if (berichten.doc !== null) {
                        $scope.berichten = berichten.doc;
                    }
                });
            }
        });
    };

    $scope.verwijderen = function (titel) {
        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                bericht = DOODService.wishlistVerwijderen.delete({gebruikersnaam: gebruiker.doc.gebruikersnaam, titel: titel}, function () {
                    if (bericht.doc.n > 0) {
                        $scope.init();
                        $scope.success = "Bericht succesvol verwijderd.";
                        $timeout(function () {
                            $scope.success = null;
                        }, 3000);
                    } else {
                        $scope.error = "Er is iets foutgegaan. Probeer het opnieuw";
                    }
                });
            }
        });
    };

    $scope.opslaan = function (wishlist) {
        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                bericht = DOODService.wishlistPost.post({gebruikersnaam: gebruiker.doc.gebruikersnaam, titel: wishlist.titel, wens: wishlist.wens}, function () {
                    if (bericht.doc !== null) {
                        $scope.init();
                        $scope.wishlistForm.$setPristine();
                        $scope.success = "Bericht succesvol opgeslagen.";
                        $timeout(function () {
                            $scope.success = null;
                        }, 3000);
                    } else if (bericht.err !== null) {
                        $scope.error = bericht.err;
                    }
                });
            }
        });

    };
});

myApp.controller('muziekController', function ($scope, DOODService, Spotify) {
    "use strict";
    var voegLiedjeToe = function (titel, artiest) {
        if ($scope.zoekResultaat.length < 9) {
            $scope.zoekResultaat.push({artiest: artiest, titel: titel});
        } else {
            return;
        }
        console.log(".");
    };

   /* $scope.gebruiker = DOODService.gebruikerSessie.get(function () {
        if (gebruiker.doc.gebruikersnaam !== undefined) {
            $scope.verwijderAlleSegmenten = DOODService.uitvaartSegmentenVerwijderen.delete({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                if ($scope.verwijderAlleSegmenten.err === null) {
                    //stuurDataLoop(gebruiker.doc.gebruikersnaam);
                    console.log(".");
                }
            });
        }
    });*/

    $scope.muziekDb =  [
        {artiest: "Coon", titel: "Million miles"},
        {artiest: "Adele", titel:  "Rain"},
        {artiest: "Diggy Dex", titel: "De vallende sterren"},
        {artiest: "one republic", titel: "Counting stars"}
    ];

    $scope.zoekResultaat = [];
    $scope.afspeellijst = [];

    $scope.voegToeBijAfspeellijst = function (artiest, titel) {
        var liedInAfspeelLijst;
        liedInAfspeelLijst = [{
            artiest: artiest,
            titel: titel
        }];

        $scope.afspeellijst.push(liedInAfspeelLijst);
        console.log($scope.afspeellijst[0][0]);
    };


    $scope.verwijderUitLijst = function (artiest, titel) {
        var i;
        for (i = 0; i < $scope.afspeellijst.length; i++) {
            if ($scope.afspeellijst[i][0].artiest === artiest && $scope.afspeellijst[i][0].titel === titel) {
                $scope.afspeellijst.splice(i, 1);
                return;
            }
        }
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
        } else {
            $scope.error = "Vul een titel in";
        }
    };
});

myApp.controller('FotoController', function ($scope, DOODService, $timeout) {
    "use strict";
    var gebruiker, ingevoerdeFoto, uploadFile;

    $scope.setFiles = function(element) {
        $scope.$apply(function() {
            console.log('files:', element.files);
            // Turn the FileList object into an Array
            $scope.files = [];
            for (var i = 0; i < element.files.length; i += 1) {
                $scope.files.push(element.files[i]);
            }
        });
    };

    uploadFile = function() {
        var fd = new FormData(), i;
        console.log('Begin uploaden');
        for (i in $scope.files) {
            if ($scope.files.hasOwnProperty(i)) {
                fd.append("uploadedFile", $scope.files[i]);
            }
        }
        var xhr = new XMLHttpRequest();
        //xhr.addEventListener("load", uploadComplete, false);
        //xhr.addEventListener("error", uploadFailed, false);
        xhr.open("POST", "/uploadedImages", true);
        xhr.send(fd);
        console.log('Einde uploaden');
    };

    $scope.init = function () {
        var fotos;
        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                fotos = DOODService.foto.get({gebruikersnaam: gebruiker.doc.gebruikersnaam}, function () {
                    if (fotos.doc !== null) {
                        $scope.fotos = fotos.doc;
                    }
                });
            }
        });
    };

    $scope.opslaan = function (foto) {
        var fotoPost;
        ingevoerdeFoto = document.getElementById('fotoUploaden').files[0];
        if (ingevoerdeFoto === null) {
            return;
        }
        gebruiker = DOODService.gebruikerSessie.get(function () {
            if (gebruiker.doc.gebruikersnaam !== undefined) {
                fotoPost = DOODService.fotoPost.post({gebruikersnaam: gebruiker.doc.gebruikersnaam, bestandsnaam: foto.bestandsnaam, volgnummer: 1}, function () {
                    if (fotoPost.doc !== null) {
                        $scope.init();
                        uploadFile();
                        $scope.fotoForm.$setPristine();
                        $scope.success = "Foto succesvol opgeslagen.";
                        $timeout(function () {
                            $scope.success = null;
                        }, 3000);
                    } else if (fotoPost.err !== null) {
                        $scope.error = fotoPost.err;
                    }
                });
            }
        });
    };
});