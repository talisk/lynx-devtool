var mergeExtension = function(users) {
  var output = [];
  return {
    middleware: output.concat(users)
  };
};
var createMiddlewareCollecter = function() {
  var webMiddlewares = [];
  var apiMiddlewares = [];
  var addWebMiddleware = function(input) {
    webMiddlewares.push(input);
  };
  var addAPIMiddleware = function(input) {
    apiMiddlewares.push(input);
  };
  var getMiddlewares = function() {
    return {
      web: webMiddlewares,
      api: apiMiddlewares
    };
  };
  return {
    getMiddlewares,
    addWebMiddleware,
    addAPIMiddleware
  };
};
export {
  createMiddlewareCollecter,
  mergeExtension
};
