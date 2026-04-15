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
var createSourceConfig_exports = {};
__export(createSourceConfig_exports, {
  createSourceConfig: () => createSourceConfig
});
module.exports = __toCommonJS(createSourceConfig_exports);
function createSourceConfig(config) {
  const { alias, envVars, globalVars, include, moduleScopes, preEntry, entries, mainEntryName, enableAsyncEntry, enableCustomEntry, disableDefaultEntries, entriesDir, configDir } = config.source;
  const builderGlobalVars = globalVars || {};
  for (const envVar of envVars || []) {
    const envVarValue = process.env[envVar];
    envVarValue && (builderGlobalVars[`process.env.${envVar}`] = envVarValue);
  }
  return {
    alias,
    moduleScopes,
    globalVars: builderGlobalVars,
    include,
    preEntry,
    entries,
    mainEntryName,
    enableAsyncEntry,
    enableCustomEntry,
    disableDefaultEntries,
    entriesDir,
    configDir,
    resolveExtensionPrefix: {
      web: ".web",
      node: ".node"
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createSourceConfig
});
