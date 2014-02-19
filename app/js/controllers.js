'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http, phoneapi) {
  
  $http.defaults.useXDomain = true; // Allow CORS
  $scope.phones = phoneapi.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];

function PhoneDetailCtrl($scope, $http, $routeParams, phoneapi) {
  
  $http.defaults.useXDomain = true; // Allow CORS

  bind();

  $scope.setImage = function(imageUrl) {
    $scope.mainImageUrl = imageUrl;
  }

  $scope.save = function(){
    console.log($scope.phone);
    $scope.phone.$save();
    bind();
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
  }

  $scope.watchCallback = function(modelName) {
        console.log(modelName+" was changed");
  };

  function bind(){
    $scope.phone = phoneapi.get({phoneId: $routeParams.phoneId}, function(phone) {
      console.log($routeParams.phoneId);
      console.log(phone);
      $scope.mainImageUrl = phone.images[0];
    });    
  } 
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
