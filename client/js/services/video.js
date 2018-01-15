angular.module('app').factory('Video', ['$injector', ($injector) => {
  const moment = $injector.get('moment');
  const utils = $injector.get('utils');
  const config = $injector.get('config');

  /**
   * Constructs a new video object.
   */
  function Video(props) {
    _.extend(this, props);
    this.defineProps();
  }

  Video.prototype = {

    /**
     * Sets the properties for the video.
     */
    defineProps() {
      this.url = `${config.url}${this.id}`;
    }

  };

  return Video;

}]);
