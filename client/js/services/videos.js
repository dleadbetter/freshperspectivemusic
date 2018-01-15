angular.module('app').factory('videos', ['$injector', ($injector) => {
  const Video = $injector.get('Video');
  const api = $injector.get('api');
  const _ = $injector.get('_');

  return {

    /**
     * Returns all videos for the passed parameters.
     */
    fetchAll(params) {
      return api
        .get('videos', params)
        .then(response => ({
          videos: _.map(response.data, video => new Video(video)),
          paging: response.paging
        }));
    }

  };
}]);
