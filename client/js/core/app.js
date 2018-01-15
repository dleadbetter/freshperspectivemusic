// Include the underscorejs module
angular.module('underscore', []).factory('_', ['$window', ($window) => {
  return $window._;
}]);

// Include the momentjs module
angular.module('moment', []).factory('moment', ['$window', ($window) => {
  return $window.moment;
}]);

// Setup the app
angular.module('app', ['underscore', 'moment']);
