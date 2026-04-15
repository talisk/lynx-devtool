import { RuntimeReactContext, getInitialContext } from "./runtime";
var globalContext = {};
function setGlobalContext(context) {
  globalContext.App = context.App;
  globalContext.routes = context.routes;
  globalContext.appInit = context.appInit;
  globalContext.appConfig = typeof context.appConfig === "function" ? context.appConfig() : context.appConfig;
  globalContext.layoutApp = context.layoutApp;
}
function getGlobalApp() {
  return globalContext.App;
}
function getGlobalRoutes() {
  return globalContext.routes;
}
function getGlobalAppInit() {
  var _getGlobalApp, _getGlobalLayoutApp;
  return globalContext.appInit || ((_getGlobalApp = getGlobalApp()) === null || _getGlobalApp === void 0 ? void 0 : _getGlobalApp.init) || ((_getGlobalLayoutApp = getGlobalLayoutApp()) === null || _getGlobalLayoutApp === void 0 ? void 0 : _getGlobalLayoutApp.init);
}
function getGlobalAppConfig() {
  var _getGlobalApp, _getGlobalLayoutApp;
  return globalContext.appConfig || ((_getGlobalApp = getGlobalApp()) === null || _getGlobalApp === void 0 ? void 0 : _getGlobalApp.config) || ((_getGlobalLayoutApp = getGlobalLayoutApp()) === null || _getGlobalLayoutApp === void 0 ? void 0 : _getGlobalLayoutApp.config);
}
function getGlobalLayoutApp() {
  return globalContext.layoutApp;
}
export {
  RuntimeReactContext,
  getGlobalApp,
  getGlobalAppConfig,
  getGlobalAppInit,
  getGlobalLayoutApp,
  getGlobalRoutes,
  getInitialContext,
  setGlobalContext
};
