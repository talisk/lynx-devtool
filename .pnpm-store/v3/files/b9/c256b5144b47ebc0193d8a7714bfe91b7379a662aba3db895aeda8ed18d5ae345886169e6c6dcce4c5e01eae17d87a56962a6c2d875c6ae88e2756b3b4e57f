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
var nodeApi_exports = {};
__export(nodeApi_exports, {
  build: () => build,
  deploy: () => deploy,
  dev: () => dev
});
module.exports = __toCommonJS(nodeApi_exports);
var import__ = require(".");
const dev = (options, commandOptions = []) => {
  import__.cli.runCommand("dev", commandOptions, options);
};
const build = (options, commandOptions = []) => {
  import__.cli.runCommand("build", commandOptions, options);
};
const deploy = (options, commandOptions = []) => {
  import__.cli.runCommand("deploy", commandOptions, options);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  build,
  deploy,
  dev
});
