// routes/routes.js
const https = require('https');
const url = require('url');
const querystring = require('querystring');
const _ = require('underscore');

const API_SEARCH = '/api/';
const API_REPLACE = '';

module.exports = function(app, db) {
  const config = app.get('config');

  /*
   * Redirects the URL to the Facebook Graph API.
   */
  app.get('/api/*', (req, res) => {

    console.log(config.accessToken);

    const urlOptions = url.parse(req.url);
    req.pause();

    const hostname = 'graph.facebook.com';
    const port = 443;
    const method = 'GET';

    const parameters = { access_token: config.accessToken };
    _.extend(parameters, querystring.parse(urlOptions.query));

    const params = querystring.stringify(parameters);
    const path = `/v2.11/${getApiUrl(urlOptions.pathname)}?${params}`;
    const options = { hostname, port, path, method };

    const connector = https.request(options, (response) => {
      response.pause();
      res.writeHeader(response.statusCode, response.headers);
      response.pipe(res, { end: true });
      response.resume();
    });

    req.pipe(connector, { end: true });
    req.resume();
  });

  /*
   * Default URL. Returns the index page.
   */
  app.get('*', function(req, res) {
    res.sendfile('./client/index.html');
  });
};

/**
 * Returns the API URL.
 */
function getApiUrl(path) {
  return path.replace(API_SEARCH, API_REPLACE);
}
