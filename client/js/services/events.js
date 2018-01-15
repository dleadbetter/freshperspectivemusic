angular.module('app').factory('events', ['$injector', ($injector) => {
  const api = $injector.get('api');

  return {

    /**
     * Returns all events for the passed parameters.
     */
    fetchAll(params) {
      return api
        .get('events', params)
        .then(response => ({ events: response.data, paging: response.paging }));
    }

  };
}]);
