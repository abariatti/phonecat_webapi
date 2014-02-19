'use strict';

/* Services */

angular.module('phonecatServices', ['ngResource'])
.factory('phoneapi', function($resource){
  return $resource(
  	'http\\://localhost\\:3000/phones/:phoneId',
  	{
  		phoneId:'@_id'
  	}
  );
});
