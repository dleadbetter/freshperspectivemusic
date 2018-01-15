angular.module('app').factory('config', ['$injector', ($injector) => {
  const $window = $injector.get('$window');

  return {
    api: `${$window.location.href}api/freshperspectivemusic`,
    url: 'https://www.facebook.com/freshperspectivemusic/videos/'
  };
}]);
