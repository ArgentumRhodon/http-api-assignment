const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlHandler');
const api = require('./api');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/style.css': htmlHandler.getStyles,
  '/success': api.success,
  '/badRequest': api.badRequest,
  '/unauthorized': api.unauthorized,
  '/forbidden': api.forbidden,
  '/internal': api.internal,
  '/notImplemented': api.notImplemented,
  notFound: api.notFound,
};

const onRequest = (request, response) => {
  const parsedURL = url.parse(request.url);
  const acceptedTypes = request.headers.accept.split(',');
  const params = query.parse(parsedURL.query);
  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes, params);
  } else {
    urlStruct.notFound(request, response, acceptedTypes, params);
  }
};

http.createServer(onRequest).listen(port);
