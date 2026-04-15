const mergeExtension = (users) => {
  const output = [];
  return {
    middleware: output.concat(users)
  };
};
const createMiddlewareCollecter = () => {
  const webMiddlewares = [];
  const apiMiddlewares = [];
  const addWebMiddleware = (input) => {
    webMiddlewares.push(input);
  };
  const addAPIMiddleware = (input) => {
    apiMiddlewares.push(input);
  };
  const getMiddlewares = () => ({
    web: webMiddlewares,
    api: apiMiddlewares
  });
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
