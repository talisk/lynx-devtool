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
var getFinalOption_exports = {};
__export(getFinalOption_exports, {
  getFilesFromDir: () => getFilesFromDir,
  getFinalCompilerOption: () => getFinalCompilerOption,
  getFinalExtensions: () => getFinalExtensions,
  getGlobPattern: () => getGlobPattern
});
module.exports = __toCommonJS(getFinalOption_exports);
var import_core = require("@babel/core");
var import_utils = require("@modern-js/utils");
var import_defaults = require("./defaults");
const getGlobPattern = (dir, extensions) => {
  if (extensions.length > 1) {
    return `${dir}/**/*{${extensions.join(",")}}`;
  } else if (extensions.length === 1) {
    return `${dir}/**/*${extensions[0]}`;
  } else {
    return `${dir}/**/*`;
  }
};
const getFinalExtensions = (extensions) => {
  const isExtensions = (ext) => Array.isArray(ext);
  const isExtensionsFunc = (ext) => typeof ext === "function";
  if (isExtensions(extensions)) {
    return [
      ...extensions,
      ...import_core.DEFAULT_EXTENSIONS
    ];
  } else if (isExtensionsFunc(extensions)) {
    return extensions(import_core.DEFAULT_EXTENSIONS);
  } else {
    return import_core.DEFAULT_EXTENSIONS;
  }
};
const getFilesFromDir = ({ dir, finalExt = [], ignore = [] }) => {
  let globFindFilenames = [];
  const globPattern = getGlobPattern(dir, finalExt);
  globFindFilenames = import_utils.glob.sync(globPattern, {
    ignore
  });
  return globFindFilenames;
};
const getFinalCompilerOption = (option) => {
  const optionWithDefault = (0, import_defaults.mergeDefaultOption)(option);
  const { sourceDir, ignore, enableWatch = false, watchDir, extensions = import_core.DEFAULT_EXTENSIONS } = option;
  let globFindFilenames = [];
  const finalExt = getFinalExtensions(extensions);
  if (sourceDir) {
    globFindFilenames = getFilesFromDir({
      dir: sourceDir,
      ignore,
      finalExt
    });
  }
  if (enableWatch) {
    globFindFilenames = getFilesFromDir({
      dir: watchDir,
      ignore,
      finalExt
    });
  }
  return {
    ...optionWithDefault,
    filenames: [
      ...optionWithDefault.filenames,
      ...globFindFilenames
    ]
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFilesFromDir,
  getFinalCompilerOption,
  getFinalExtensions,
  getGlobPattern
});
