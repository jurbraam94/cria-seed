/*jslint node: true */
/*globals myApp */


/**
 * TODO: create controller for book list
 * @param $scope
 * @param booksService
 * @constructor
 */
function BookListCtrl($scope, gebruikersnaamService) {
    "use strict";
    // GET all gebruiker
    $scope.gebruiker = gebruikersnaamService.gebruiker.get();
}

/**
 * TODO: create controller for retrieving 1 book, create and delete
 * @param $scope
 * @param $routeParams
 * @param gebruikersnaamService
 * @constructor
 */
function BookDetailCtrl($scope, $routeParams, $location, gebruikersnaamService) {
    "use strict";
    // GET 1 book

    if ($routeParams._gebruikersnaam !== 'new') {
        $scope.gebruiker = gebruikersnaamService.gebruiker.get({_gebruikersnaam: $routeParams._gebruikersnaam}, function () {
            console.log('$scope.requests ', $scope.requests);
        });
    }

    // DELETE book
    $scope.delete = function () {
        gebruikersnaamService.gebruiker.delete({_gebruikersnaam: $routeParams._gebruikersnaam});
        $location.path("/gebruiker");
    };

    // CREATE, UPDATE book
    $scope.save = function () {

        if ($scope.gebruiker.doc && $scope.gebruiker.doc._gebruikersnaam !== undefined) {
            console.log('Entering update');
            gebruikersnaamService.gebruiker.update({_gebruikersnaam: $scope.gebruiker.doc._gebruikersnaam}, $scope.gebruiker, function (res) {
                console.log(res);
            });
        } else {
            console.log('Entering save');
            gebruikersnaamService.gebruiker.save({}, $scope.gebruiker.doc, function (res) {
                console.log(res);
            });
        }
    };
}

myApp.controller('myCtrl', function ($scope) {
    "use strict";
    // TODO: bind settings with whoami
    $scope.whomai = "theotheu";
});

