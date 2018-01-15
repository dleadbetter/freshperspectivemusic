angular.module('app').factory('posts', ['$injector', ($injector) => {
  const Post = $injector.get('Post');
  const api = $injector.get('api');
  const _ = $injector.get('_');

  /**
   * Returns true if the passed post should be included in the list.
   */
  function filterPosts(post) {
    let valid = true;

    // Exclude posts with no message
    if (!post.message) {
      valid = false;
    }

    // Exclude posts updating cover photos
    if (post.story && post.story.includes('cover photo')) {
      valid = false;
    }

    return valid;
  }

  return {

    /**
     * Returns all posts for the passed parameters.
     */
    fetchAll(params) {
      return api.get('posts', params).then(response => ({
        posts: _.map(_.filter(response.data, filterPosts), post => new Post(post)),
        paging: response.paging
      }));
    }
    
  };
}]);
