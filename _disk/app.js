var app = angular.module('myApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});

app.controller('myCtrl', function($scope,$http) {
    $scope.firstName= "John";
    $scope.lastName= "Doe";
    //$scope.rezepte = GLOBALDATA.rezepte;
  console.log("calling jsonp");
    $http.jsonp('http://192.168.206.24:8080/rezepte?callback=JSON_CALLBACK').
        success(function(data, status, headers, config) {
            console.log(data.found);
            $scope.rezepte = data;
        }).error(function(data, status, headers, config) {
          console.log("error");
    });

});
