angular.module('app').factory('Post', ['$injector', ($injector) => {
  const moment = $injector.get('moment');
  const utils = $injector.get('utils');

  /**
   * Constructs a new post object.
   */
  function Post(props) {
    _.extend(this, props);
    this.defineProps();
  }

  Post.prototype = {

    /**
     * Sets the post properties.
     */
    defineProps() {
      this.content = utils.text2HTML(this.message);
      this.created_at = moment(this.created_time);
    }
    
  };

  return Post;

}]);
