const respond = (request, response, status, type, object) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(object);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const message = 'Successful response.';
  const responseJSON = { message };

  if (acceptedTypes[0] === 'text/xml') {
    const responseXML = `<response><message>${message}</message></response>`;
    return respond(request, response, 200, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    200,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

const badRequest = (request, response, acceptedTypes, params) => {
  const messageValid = 'This request has the required parameters.';
  const messageInvalid = 'Missing valid query parameter set to true.';
  const id = 'badRequest';

  const responseJSON = { message: messageValid };
  let responseXML = `<response><message>${messageValid}</message></response>`;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    if (acceptedTypes[0] === 'text/xml') {
      responseXML = `<response><message>${messageInvalid}</message><id>${id}</id></response>`;
      return respond(request, response, 400, 'text/xml', responseXML);
    }

    responseJSON.message = messageInvalid;
    responseJSON.id = id;
    return respond(
      request,
      response,
      400,
      'application/json',
      JSON.stringify(responseJSON),
    );
  }

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 200, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    200,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const messageValid = 'This request has the required parameters.';
  const messageInvalid = 'Missing loggedIn query parameter set to yes.';
  const id = 'unauthorized';

  const responseJSON = { message: messageValid };
  let responseXML = `<response><message>${messageValid}</message></response>`;

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    if (acceptedTypes[0] === 'text/xml') {
      responseXML = `<response><message>${messageInvalid}</message><id>${id}</id></response>`;
      return respond(request, response, 401, 'text/xml', responseXML);
    }

    responseJSON.message = messageInvalid;
    responseJSON.id = id;
    return respond(
      request,
      response,
      401,
      'application/json',
      JSON.stringify(responseJSON),
    );
  }

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 200, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    200,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

const forbidden = (request, response, acceptedTypes) => {
  const message = 'You do not have access to this content.';
  const id = 'forbidden';

  const responseJSON = { message, id };
  const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 403, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    403,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

const internal = (request, response, acceptedTypes) => {
  const message = 'Internal server error. Something went wrong.';
  const id = 'internalError';

  const responseJSON = { message, id };
  const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 500, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    500,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

const notImplemented = (request, response, acceptedTypes) => {
  const message = 'A get request for this page has not been implemented yet. Check again later for updated content.';
  const id = 'notImplemented';

  const responseJSON = { message, id };
  const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 501, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    501,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

const notFound = (request, response, acceptedTypes) => {
  const message = 'The page you are looking for was not found.';
  const id = 'notFound';

  const responseJSON = { message, id };
  const responseXML = `<response><message>${message}</message><id>${id}</id></response>`;

  if (acceptedTypes[0] === 'text/xml') {
    return respond(request, response, 404, 'text/xml', responseXML);
  }

  return respond(
    request,
    response,
    404,
    'application/json',
    JSON.stringify(responseJSON),
  );
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
};
