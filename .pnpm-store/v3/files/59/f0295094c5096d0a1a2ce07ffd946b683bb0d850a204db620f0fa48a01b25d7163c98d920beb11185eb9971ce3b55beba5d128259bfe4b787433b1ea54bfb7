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
var createServer_exports = {};
__export(createServer_exports, {
  closeServer: () => closeServer,
  createServer: () => createServer,
  getServer: () => getServer,
  setServer: () => setServer
});
module.exports = __toCommonJS(createServer_exports);
var import_prod_server = require("@modern-js/prod-server");
var import_server = require("@modern-js/server");
let server = null;
const getServer = () => server;
const setServer = (newServer) => {
  server = newServer;
};
const closeServer = async () => {
  if (server) {
    server.close();
    server = null;
  }
};
const createServer = async (options) => {
  if (server) {
    server.close();
  }
  server = (await (0, import_server.createDevServer)(options, import_prod_server.applyPlugins)).server;
  return server;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  closeServer,
  createServer,
  getServer,
  setServer
});
