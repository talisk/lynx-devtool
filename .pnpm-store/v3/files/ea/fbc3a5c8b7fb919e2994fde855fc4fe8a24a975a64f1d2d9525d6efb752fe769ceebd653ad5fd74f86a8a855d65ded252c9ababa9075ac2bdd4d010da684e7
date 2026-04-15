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
var manifest_exports = {};
__export(manifest_exports, {
  generateManifest: () => generateManifest
});
module.exports = __toCommonJS(manifest_exports);
const generateManifest = (seed, files, entries) => {
  const manifestFiles = files.reduce((manifest, file) => {
    manifest[file.name] = file.path;
    return manifest;
  }, seed);
  const entrypointFiles = Object.keys(entries).reduce((previous, name) => previous.concat(entries[name].filter((fileName) => !fileName.endsWith(".map"))), []);
  return {
    files: manifestFiles,
    entrypoints: entrypointFiles
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateManifest
});
