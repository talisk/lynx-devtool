"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var context_exports = {};
__export(context_exports, {
  RuntimeReactContext: () => import_runtime.RuntimeReactContext,
  getGlobalApp: () => getGlobalApp,
  getGlobalAppConfig: () => getGlobalAppConfig,
  getGlobalAppInit: () => getGlobalAppInit,
  getGlobalLayoutApp: () => getGlobalLayoutApp,
  getGlobalRoutes: () => getGlobalRoutes,
  getInitialContext: () => import_runtime.getInitialContext,
  setGlobalContext: () => setGlobalContext
});
module.exports = __toCommonJS(context_exports);
var import_runtime = require("./runtime");
const globalContext = {};
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RuntimeReactContext,
  getGlobalApp,
  getGlobalAppConfig,
  getGlobalAppInit,
  getGlobalLayoutApp,
  getGlobalRoutes,
  getInitialContext,
  setGlobalContext
});
