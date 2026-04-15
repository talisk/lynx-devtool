"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var src_exports = {};
__export(src_exports, {
  applyPlugins: () => import_apply2.applyPlugins,
  createProdServer: () => createProdServer,
  loadServerPlugins: () => import_node2.loadServerPlugins,
  loadServerRuntimeConfig: () => import_node2.loadServerRuntimeConfig
});
module.exports = __toCommonJS(src_exports);
var import_server_core = require("@modern-js/server-core");
var import_node = require("@modern-js/server-core/node");
var import_source_map_support = __toESM(require("source-map-support"));
var import_apply = require("./apply");
var import_apply2 = require("./apply");
var import_node2 = require("@modern-js/server-core/node");
import_source_map_support.default.install();
const createProdServer = async (options) => {
  await (0, import_node.loadServerEnv)(options);
  const serverBaseOptions = options;
  const serverCliConfig = process.env.NODE_ENV === "production" ? (0, import_node.loadServerCliConfig)(options.pwd, options.config) : options.config;
  if (serverCliConfig) {
    serverBaseOptions.config = serverCliConfig;
  }
  const serverRuntimeConfig = await (0, import_node.loadServerRuntimeConfig)(options.pwd, options.serverConfigFile, options.serverConfigPath);
  if (serverRuntimeConfig) {
    serverBaseOptions.serverConfig = serverRuntimeConfig;
  }
  const server = (0, import_server_core.createServerBase)(serverBaseOptions);
  const nodeServer = await (0, import_node.createNodeServer)(server.handle.bind(server));
  await (0, import_apply.applyPlugins)(server, options, nodeServer);
  await server.init();
  return nodeServer;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  applyPlugins,
  createProdServer,
  loadServerPlugins,
  loadServerRuntimeConfig
});
