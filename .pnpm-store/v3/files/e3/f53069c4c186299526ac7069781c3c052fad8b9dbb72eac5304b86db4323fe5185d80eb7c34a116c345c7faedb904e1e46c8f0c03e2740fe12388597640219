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
var netlify_exports = {};
__export(netlify_exports, {
  createNetlifyFunction: () => createNetlifyFunction
});
module.exports = __toCommonJS(netlify_exports);
var import_server_core = require("@modern-js/server-core");
var import_node = require("@modern-js/server-core/node");
var import_apply = require("./apply");
const createNetlifyFunction = async (options) => {
  const serverCliConfig = (0, import_node.loadServerCliConfig)(options.pwd, options.config);
  if (serverCliConfig) {
    options.config = serverCliConfig;
  }
  const server = (0, import_server_core.createServerBase)(options);
  await (0, import_node.loadServerEnv)(options);
  await (0, import_apply.applyPlugins)(server, options);
  await server.init();
  return (request, context) => {
    return server.handle(request, context);
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createNetlifyFunction
});
