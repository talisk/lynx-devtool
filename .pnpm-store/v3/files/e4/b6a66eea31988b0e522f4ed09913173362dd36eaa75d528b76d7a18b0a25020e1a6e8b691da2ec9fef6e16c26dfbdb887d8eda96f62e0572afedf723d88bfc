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
  AGGRED_DIR: () => AGGRED_DIR,
  REPLACE_REG: () => REPLACE_REG,
  SERVER_TIMING: () => SERVER_TIMING,
  ServerTimings: () => ServerTimings,
  X_MODERNJS_RENDER: () => X_MODERNJS_RENDER,
  X_RENDER_CACHE: () => X_RENDER_CACHE
});
module.exports = __toCommonJS(constants_exports);
const AGGRED_DIR = {
  mock: "config/mock",
  server: "server",
  api: "api",
  shared: "shared",
  lambda: "lambda"
};
const REPLACE_REG = {
  before: {
    head: "<head\\b[^>]*>",
    body: "<body\\b[^>]*>"
  },
  after: {
    head: "</head>",
    body: "</body>"
  }
};
var ServerTimings;
(function(ServerTimings2) {
  ServerTimings2["SERVER_HANDLE_REQUEST"] = "server-handle-request";
  ServerTimings2["SERVER_MIDDLEWARE"] = "server-middleware";
  ServerTimings2["SERVER_HOOK_AFTER_RENDER"] = "server-hook-after-render";
  ServerTimings2["SERVER_HOOK_AFTER_MATCH"] = "server-hook-after-match";
})(ServerTimings || (ServerTimings = {}));
const SERVER_TIMING = "Server-Timing";
const X_RENDER_CACHE = "x-render-cache";
const X_MODERNJS_RENDER = "x-modernjs-render";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AGGRED_DIR,
  REPLACE_REG,
  SERVER_TIMING,
  ServerTimings,
  X_MODERNJS_RENDER,
  X_RENDER_CACHE
});
