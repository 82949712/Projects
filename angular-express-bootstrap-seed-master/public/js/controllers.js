'use strict';

/* Controllers */

function AppCtrl($http, $scope) {
  $http({method: 'GET', url: '/files/getAllAppVersions'}).
  success(function(data, status, headers, config) {
    console.log("All data returned from fileManager: " + data);
    $scope.allDirs = data;
  }).
  error(function(data, status, headers, config) {
      $scope.name = 'Error!';
  });
}

function MyCtrl1() {}
MyCtrl1.$inject = [];


function MyCtrl2() {
}
MyCtrl2.$inject = [];
