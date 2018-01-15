angular.module('app').factory('api', ['$injector', ($injector) => {
  const $http = $injector.get('$http');
  const config = $injector.get('config');

  return {

    /**
     * Makes the asynchronous API call and returns the response data.
     */
    get(path, params) {
      return $http({
        url: `${config.api}/${path}`,
        method: 'GET',
        params
      }).then(response => response.data);
    }
    
  }
}]);
