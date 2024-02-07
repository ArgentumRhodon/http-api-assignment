const http = require("http");
const htmlHandler = require("./htmlHandler");
const { parse } = require("url");

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  "/": htmlHandler.getIndex,
  "/style.css": htmlHandler.getStyles,
  index: htmlHandler.getIndex,
};

const onRequest = (request, response) => {
  const parsedURL = parse(request.url);
  const acceptedTypes = request.headers.accept.split(",");
  if (urlStruct[parsedURL.pathname]) {
    urlStruct[parsedURL.pathname](request, response, acceptedTypes);
  } else {
    urlStruct.index(request, response, acceptedTypes);
  }
};

http.createServer(onRequest).listen(port);
