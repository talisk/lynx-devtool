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
var validate_exports = {};
__export(validate_exports, {
  sourceDirAndFileNamesValidMessage: () => sourceDirAndFileNamesValidMessage,
  validate: () => validate,
  validateSourceDirAndFileNames: () => validateSourceDirAndFileNames,
  validateWatchDir: () => validateWatchDir,
  watchDirValidMessage: () => watchDirValidMessage
});
module.exports = __toCommonJS(validate_exports);
var import_utils = require("@modern-js/utils");
const sourceDirAndFileNamesValidMessage = "At least one of the sourceDir and filenames configurations must be configured";
const watchDirValidMessage = "should set watchDir when enableWatch is true";
const validateSourceDirAndFileNames = (compilerOptions) => {
  const { sourceDir, filenames, quiet } = compilerOptions;
  if (!sourceDir && !filenames) {
    if (!quiet) {
      import_utils.logger.error(sourceDirAndFileNamesValidMessage);
    }
    return {
      code: 1,
      message: sourceDirAndFileNamesValidMessage,
      virtualDists: []
    };
  }
  return null;
};
const validateWatchDir = (compilerOptions) => {
  const { watchDir, enableWatch, quiet } = compilerOptions;
  if (enableWatch && !watchDir) {
    if (!quiet) {
      import_utils.logger.error(watchDirValidMessage);
    }
    return {
      code: 1,
      message: watchDirValidMessage,
      virtualDists: []
    };
  }
  return null;
};
const validate = (compilerOptions) => {
  if (compilerOptions.enableWatch) {
    return validateWatchDir(compilerOptions);
  }
  return validateSourceDirAndFileNames(compilerOptions);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sourceDirAndFileNamesValidMessage,
  validate,
  validateSourceDirAndFileNames,
  validateWatchDir,
  watchDirValidMessage
});
