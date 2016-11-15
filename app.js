var app = angular.module('myApp', [], function($interpolateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');
});
app.controller('myCtrl', function($scope,$http) {
    $scope.randomCount = 3;
    $scope.serverIP = "http://192.168.204.198:8080/"; // "http://192.168.204.198:8080/";

    $scope.query = "";

    $scope.$watch ("query",function () {
      $scope.rezepteSuche();
    });

    $scope.schritte = [{"zid":'' , "desc":'', "indexx":0,"zeit":5}];

    $scope.lastRezeptId = 0;

    $scope.hinzufuegen = function ()
    {
      $scope.schritte.push({"zid":'' , "desc":'', "indexx":$scope.schritte.length,"zeit":5});
    }

    $scope.newRezept = function ()
    {
      $http.jsonp($scope.serverIP + 'newRezept?callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(JSON.stringify(data) );
              $scope.lastRezeptId = data;
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    }

    function schrittSenden(s)
    {
      $http.jsonp($scope.serverIP + 'neuerSchritt?rid='+$scope.lastRezeptId+
                                                  '&zid='+s.zid+
                                                  '&beschreibung='+s.desc+
                                                  '&zeit='+s.zeit+
                                                  '&index='+s.indexx+
                                                  '&callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(JSON.stringify(data) );
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    }


    function changeRezeptName(name)
    {
      $http.jsonp($scope.serverIP + '/changeRezeptName?id='+$scope.lastRezeptId+
                                                  '&name='+name+
                                                  '&callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(JSON.stringify(data) );
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    }

    function schrittSenden(s)
    {
      $http.jsonp($scope.serverIP + 'neuerSchritt?rid='+$scope.lastRezeptId+
                                                  '&zid='+s.zid+
                                                  '&beschreibung='+s.desc+
                                                  '&zeit='+s.zeit+
                                                  '&index='+s.indexx+
                                                  '&callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(JSON.stringify(data) );
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    }

    $scope.rezeptAbsenden = function ()
    {
      for (var i = 0; i < $scope.schritte.length; i++) {
          schrittSenden($scope.schritte[i]);
      }
      changeRezeptName($scope.rezeptName);

      $scope.schritte =  [{"zid":'' , "desc":'', "indexx":0,"zeit":5}];
      $scope.lastRezeptId = null;
    }

    $scope.rezepteSuche = function()
    {
      $http.jsonp($scope.serverIP + 'rezepteSuche?query='+$scope.query+'&callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(JSON.stringify(data) );
              $scope.rezepte = data;
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    };

    $scope.randomCart = function (count)
    {
      $http.jsonp($scope.serverIP + 'getRandomCart?count='+count+'&callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(JSON.stringify(data) );
              $scope.cartScore = data;
              $scope.getCart();
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    };

    $scope.getRezept = function (rid) {
      $http.jsonp($scope.serverIP + 'getRezept?id='+rid+'&callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(data.found);
              $scope.rezepte = [data];
              $scope.rezeptDetails = [data];

          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    };

    $scope.getCart = function () {
      $http.jsonp($scope.serverIP + 'cart?callback=JSON_CALLBACK').
          success(function(data, status, headers, config) {
            //  console.log(data.found);
              $scope.cart = data;
          }).error(function(data, status, headers, config) {
            console.log("error");
      });
    };

    $http.jsonp($scope.serverIP + 'rezepte?callback=JSON_CALLBACK').
        success(function(data, status, headers, config) {
          //  console.log(data.found);
            $scope.rezepte = data;
        }).error(function(data, status, headers, config) {
          console.log("error");
    });

    $scope.findGetParameter =  function  (parameterName) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

$scope.DetailsView = new function ()
{
    var rid = $scope.findGetParameter("rid");
    if (rid !== undefined)
    {
      $scope.getRezept(rid);
    }
}

$scope.RandomCartInit = new function()
{
      var random = $scope.findGetParameter("random");
      if (random !== undefined )
        $scope.randomCart(random);
}

    var init = function () {
      // $scope.randomCart(5);
       $scope.getCart();
     }
    // and fire it after definition
    init();
});
