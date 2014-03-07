'use strict';

/* Controllers */

function PhoneListCtrl($scope, $http, phoneapi) {
  
  $http.defaults.useXDomain = true; // Allow CORS
  $scope.phones = phoneapi.query();
  $scope.orderProp = 'age';
}

//PhoneListCtrl.$inject = ['$scope', 'Phone'];

function PhoneDetailCtrl($scope, $http, $routeParams, $location, $upload, phoneapi) {
  
  $http.defaults.useXDomain = true; // Allow CORS

  $scope.phone = phoneapi.get({phoneId: $routeParams.phoneId}, function(phone) {
      console.log(phone);
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

  $scope.delAvailability = function(item) {
    var index = $scope.phone.availability.indexOf(item);
    $scope.phone.availability.splice(index, 1);
  }

  $scope.addDimension = function() {
    $scope.phone.sizeAndWeight.dimensions.push({"dimension":"new ..."});
  };

  $scope.delDimension = function(item) {
    var index = $scope.phone.sizeAndWeight.dimensions.indexOf(item);
    $scope.phone.sizeAndWeight.dimensions.splice(index, 1);
  }

  $scope.delete = function(){
    console.log($scope.phone);
    $scope.phone.$delete();
    $location.path('/phones');
  }

  $scope.onFileSelect = function($files) {
    //$files: an array of files selected, each file has name, size, and type.
    for (var i = 0; i < $files.length; i++) {
      var file = $files[i];
      $scope.upload = $upload.upload({
        url: '/phones/upload', //upload.php script, node.js route, or servlet url
        // method: POST or PUT,
        // headers: {'headerKey': 'headerValue'},
        // withCredentials: true,
        //data: {myObj: $scope.myModelObj},
        file: file,
        // file: $files, //upload multiple files, this feature only works in HTML5 FromData browsers
        /* set file formData name for 'Content-Desposition' header. Default: 'file' */
        //fileFormDataName: myFile, //OR for HTML5 multiple upload only a list: ['name1', 'name2', ...]
        /* customize how data is added to formData. See #40#issuecomment-28612000 for example */
        //formDataAppender: function(formData, key, val){} //#40#issuecomment-28612000
      }).progress(function(evt) {
        //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
      }).success(function(data, status, headers, config) {
        // file is uploaded successfully
        console.log(data);
        console.log(config);
        console.log(config.file.name);
        // push added image to phone scope
        $scope.phone.images.push('img/phones/' + config.file.name);
      });
      //.error(...)
      //.then(success, error, progress); 
    }
    // $scope.upload = $upload.upload({...}) alternative way of uploading, sends the the file content directly with the same content-type of the file. Could be used to upload files to CouchDB, imgur, etc... for HTML5 FileReader browsers. 
  };
}

//PhoneDetailCtrl.$inject = ['$scope', '$routeParams', 'Phone'];
