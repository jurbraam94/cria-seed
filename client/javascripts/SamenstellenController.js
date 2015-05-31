/**
 * Created by Gebruiker on 28-5-2015.
 */


myApp.controller('SamenstellenController', function($scope) {
    "use strict";
/*
    function ImageItem(src){
        this.image = new Image();
        this.src = src;
    }
    */
    $scope.plaatje = 'style/images/icons/muziek.png';

    $scope.iets = "niks";
/*
    $scope.addPlaatjes = [{s
        src : "..\\style\\images\\icons\\muziek.png"
    },{
        src: "..\style\images\icons\muziek.png"
    },{
        src : "..\style\images\icons\muziek.png"
    }];
*/
 /*   $scope.boxPlaatsen = function() {
        var divBox, divBoxArray, plaatjesArray;
        divBox = document.createElement('div');
        divBox.className = "boxje";

        imgArray = [new ImageItem("../style/images/icons/MUZIEK.png"),
                    new ImageItem("../style/images/icons/STILTE.png"),
                    new ImageItem("../style/images/icons/TEKST.png")];


    }*/
});

myApp.controller('myTestCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
    $scope.whomai = "Safi Rasuli";
});


