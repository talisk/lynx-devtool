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
var react_exports = {};
__export(react_exports, {
  createRoot: () => createRoot
});
module.exports = __toCommonJS(react_exports);
var import_parsed = require("@modern-js/runtime-utils/parsed");
var import_common = require("../../common");
var import_constants = require("../constants");
var import_context = require("../context");
var import_runner = require("../plugin/runner");
function createRoot(UserApp) {
  const App = UserApp || (0, import_context.getGlobalApp)();
  if ((0, import_common.isBrowser)()) {
    window._SSR_DATA = window._SSR_DATA || (0, import_parsed.parsedJSONFromElement)(import_constants.SSR_DATA_JSON_ID);
    window._ROUTER_DATA = window._ROUTER_DATA || (0, import_parsed.parsedJSONFromElement)(import_constants.ROUTER_DATA_JSON_ID);
  }
  const runner = (0, import_runner.getGlobalRunner)();
  const WrapperApp = runner.wrapRoot(App);
  return WrapperApp;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createRoot
});
