angular.module('app').controller('app-ctrl', ($injector, $scope) => {
  const $timeout = $injector.get('$timeout');
  const events = $injector.get('events');
  const moment = $injector.get('moment');
  const posts = $injector.get('posts');
  const videos = $injector.get('videos');
  const _ = $injector.get('_');

  const EventFilter = {
    UPCOMING: 'upcoming',
    PAST: 'past'
  };

  /**
   * Returns the paging data for the passed object.
   */
  function getPage(data) {
    return data.paging && data.paging.cursors && data.paging.cursors.after;
  }

  /**
   * Initializes the controller.
   */
  function initialize() {
    $scope.currentTime = moment().toDate();

    $scope.posts = {
      data: [],
      paging: {},
      loading: false
    };

    // TODO: Cache events to avoid API calls when toggling filters
    $scope.events = {
      data: [],
      paging: {},
      filter: EventFilter.UPCOMING,
      loading: false
    };

    $scope.videos = {
      data: [],
      loading: false
    };

    $scope.loadPosts();
    $scope.loadEvents();
    $scope.loadVideos();
  }

  /**
   * Returns true if the events filter is set to
   * <code>EventFilter.PAST</code>.
   */
  $scope.isPastEvents = () => {
    return $scope.events.filter === EventFilter.PAST;
  };

  /**
   * Returns true if the events filter is set to
   * <code>EventFilter.UPCOMING</code>.
   */
  $scope.isUpcomingEvents = () => {
    return $scope.events.filter === EventFilter.UPCOMING;
  };

  /**
   * Loads the list of events from the API based on the current filter.
   */
  $scope.loadEvents = () => {
    $scope.events.loading = true;
    const params = {
      time_filter: $scope.events.filter,
      limit: 10,
      after: getPage($scope.events)
    };

    events.fetchAll(params).then((response) => {
      let eventData = _.sortBy(response.events, event => event.start_time);
      if ($scope.events.filter === EventFilter.PAST) {
        eventData = eventData.reverse();
      }

      $scope.events.data = [
        ...$scope.events.data,
        ...eventData
      ];

      $scope.events.paging = response.paging;
      $scope.events.loading = false;
    });
  };

  /**
   * Loads the list of posts from the API.
   */
  $scope.loadPosts = () => {
    $scope.posts.loading = true;
    const params = {
      limit: 5,
      after: getPage($scope.posts)
    };

    posts.fetchAll(params).then((response) => {
      $scope.posts.loading = false;
      $scope.posts.paging = response.paging;
      $scope.posts.data = [
        ...$scope.posts.data,
        ...response.posts
      ];
    });
  };

  /**
   * Loads the list of videos from the API.
   */
  $scope.loadVideos = () => {
    $scope.videos.loading = true;

    videos.fetchAll().then((response) => {
      $scope.videos.loading = false;
      $scope.videos.data = [
        ...$scope.videos.data,
        ...response.videos
      ];

      // Re-parse the Facebook plugins.
      $timeout(FB.XFBML.parse);
    });
  };

  /**
   * Sets the event filter to the passed filter.
   */
  $scope.setEventFilter = (filter) => {
    $scope.events.filter = filter;
    $scope.events.data = [];
    $scope.events.paging = {};
    $scope.loadEvents();
  };

  // Initializes the controller
  initialize();
});
