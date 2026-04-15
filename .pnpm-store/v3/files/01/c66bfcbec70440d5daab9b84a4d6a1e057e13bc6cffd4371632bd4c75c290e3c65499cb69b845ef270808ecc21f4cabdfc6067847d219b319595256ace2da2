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
var adapterBasic_exports = {};
__export(adapterBasic_exports, {
  builderPluginAdapterBasic: () => builderPluginAdapterBasic
});
module.exports = __toCommonJS(adapterBasic_exports);
var import_path = __toESM(require("path"));
var import_uni_builder = require("@modern-js/uni-builder");
const builderPluginAdapterBasic = () => ({
  name: "builder-plugin-adapter-modern-basic",
  setup(api) {
    api.modifyBundlerChain((chain, { target, CHAIN_ID, environment }) => {
      const isServiceWorker = environment.name === import_uni_builder.SERVICE_WORKER_ENVIRONMENT_NAME;
      if (target === "node" || isServiceWorker) {
        applyNodeCompat(isServiceWorker, chain);
      }
      if (target === "web") {
        const bareServerModuleReg = /\.(server|node)\.[tj]sx?$/;
        chain.module.rule(CHAIN_ID.RULE.JS).exclude.add(bareServerModuleReg);
        chain.module.rule("bare-server-module").test(bareServerModuleReg).use("server-module-loader").loader(require.resolve("../loaders/serverModuleLoader"));
      }
      chain.resolve.modules.add("node_modules").add(import_path.default.join(api.context.rootPath, "node_modules"));
    });
  }
});
function applyNodeCompat(isServiceWorker, chain) {
  const nodeExts = [
    ".node.js",
    ".node.jsx",
    ".node.ts",
    ".node.tsx",
    ".server.js",
    ".server.jsx",
    ".server.ts",
    ".server.tsx"
  ];
  const webWorkerExts = [
    ".worker.js",
    ".worker.jsx",
    ".worker.ts",
    ".worker.tsx"
  ];
  for (const ext of nodeExts) {
    chain.resolve.extensions.prepend(ext);
  }
  if (isServiceWorker) {
    for (const ext of webWorkerExts) {
      chain.resolve.extensions.prepend(ext);
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  builderPluginAdapterBasic
});
