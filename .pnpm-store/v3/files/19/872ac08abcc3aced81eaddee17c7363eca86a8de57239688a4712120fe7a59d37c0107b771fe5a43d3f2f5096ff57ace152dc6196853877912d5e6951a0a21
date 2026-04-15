#!/usr/bin/env node
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
var runBin_exports = {};
__export(runBin_exports, {
  run: () => run
});
module.exports = __toCommonJS(runBin_exports);
var import_utils = require("@modern-js/utils");
var import__ = require(".");
const run = async (otherCoreOptions = {}, options = {}) => {
  if (otherCoreOptions.initialLog) {
    import_utils.logger.greet(`  ${otherCoreOptions.initialLog}
`);
  }
  const command = process.argv[2];
  if (!process.env.NODE_ENV) {
    if ([
      "build",
      "serve",
      "deploy",
      "release"
    ].includes(command)) {
      process.env.NODE_ENV = "production";
    } else if (command === "test") {
      process.env.NODE_ENV = "test";
    } else {
      process.env.NODE_ENV = "development";
    }
  }
  const { version } = require("../package.json");
  const cliParams = (0, import_utils.minimist)(process.argv.slice(2));
  const runOptions = {
    version
  };
  const SUPPORT_CONFIG_PARAM_COMMANDS = [
    "dev",
    "build",
    "deploy",
    "start",
    "serve",
    "inspect",
    "upgrade"
  ];
  let customConfigFile;
  if (SUPPORT_CONFIG_PARAM_COMMANDS.includes(command)) {
    customConfigFile = cliParams.config || cliParams.c;
  }
  if (command === "new") {
    customConfigFile = cliParams["config-file"];
  }
  if (customConfigFile) {
    runOptions.configFile = customConfigFile;
  }
  if (typeof options.override === "boolean" && options.override) {
    await import__.cli.run(otherCoreOptions);
  } else if (typeof (options === null || options === void 0 ? void 0 : options.override) === "function") {
    await import__.cli.run(await options.override(runOptions));
  } else {
    await import__.cli.run(import_utils.lodash.merge({}, runOptions, otherCoreOptions));
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  run
});
