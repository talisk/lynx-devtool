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
var constants_exports = {};
__export(constants_exports, {
  getDefaultDevOptions: () => getDefaultDevOptions
});
module.exports = __toCommonJS(constants_exports);
var import_constants = require("@modern-js/utils/universal/constants");
const getDefaultDevOptions = () => {
  return {
    client: {
      path: import_constants.HMR_SOCK_PATH,
      // By default it is set to the port number of the dev server
      port: "",
      // By default it is set to "location.hostname"
      host: "",
      // By default it is set to "location.protocol === 'https:' ? 'wss' : 'ws'""
      protocol: void 0
    },
    https: false,
    devMiddleware: {
      writeToDisk: true
    },
    watch: true,
    hot: true,
    compress: true,
    liveReload: true
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getDefaultDevOptions
});
