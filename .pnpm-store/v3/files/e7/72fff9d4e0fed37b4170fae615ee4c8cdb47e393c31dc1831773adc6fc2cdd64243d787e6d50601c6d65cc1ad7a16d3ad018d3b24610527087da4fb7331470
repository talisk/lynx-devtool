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
var build_exports = {};
__export(build_exports, {
  build: () => build
});
module.exports = __toCommonJS(build_exports);
var import_utils = require("@modern-js/utils");
var import_compiler = require("./compiler");
var import_constants = require("./constants");
const build = async (option, babelConfig = {}) => {
  const { rootDir, enableVirtualDist, filenames, clean, distDir, distFileExtMap = import_constants.defaultDistFileExtMap, verbose = false, quiet = false } = option;
  const virtualDists = [];
  if (clean) {
    await import_utils.fs.remove(distDir);
  }
  import_utils.fs.ensureDir(distDir);
  const messageDetails = [];
  for (const filename of filenames) {
    try {
      const dist = (0, import_compiler.compiler)({
        rootDir,
        enableVirtualDist,
        filepath: filename,
        distDir,
        verbose,
        quiet,
        babelConfig,
        distFileExtMap
      });
      if (enableVirtualDist && dist) {
        virtualDists.push(dist);
      }
    } catch (e) {
      messageDetails.push({
        filename,
        content: e.toString()
      });
    }
  }
  const happenError = messageDetails.length > 0;
  if (!quiet) {
    if (happenError) {
      import_utils.logger.error(`Compilation failure ${messageDetails.length} ${messageDetails.length !== 1 ? "files" : "file"} with Babel.`);
    } else {
      import_utils.logger.info(`Successfully compiled ${filenames.length} ${filenames.length !== 1 ? "files" : "file"} with Babel.`);
    }
  }
  if (happenError) {
    return {
      code: 1,
      message: `Compilation failure ${messageDetails.length} ${messageDetails.length !== 1 ? "files" : "file"} with Babel.`,
      messageDetails
    };
  }
  return {
    code: 0,
    message: `Successfully compiled ${filenames.length} ${filenames.length !== 1 ? "files" : "file"} with Babel.`,
    virtualDists
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  build
});
