'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http, phoneapi) {
  
  $http.defaults.useXDomain = true; // Allow CORS
  $scope.phones = phoneapi.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];

function PhoneDetailCtrl($scope, $http, $routeParams, $location, phoneapi) {
  
  $http.defaults.useXDomain = true; // Allow CORS

  $scope.phone = phoneapi.get({phoneId: $routeParams.phoneId}, function(phone) {
      //console.log(phone);
      $scope.mainImageUrl = phone.images[0];
    });   

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }

  $scope.save = function(){
    console.log($scope.phone);
    $scope.phone.$save();
  }

  $scope.addAvailability = function() {
        $scope.phone.availability.push({"operator":"new ..."});
  };

  $scope.addDimension = function() {
        $scope.phone.sizeAndWeight.dimensions.push({"dimension":"new ..."});
  };

  $scope.delete = function(){
    console.log($scope.phone);
    $scope.phone.$delete();
    $location.path('/phones');
  }

  $scope.watchCallback = function(modelName) {
        console.log(modelName+" was changed");
  };
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
