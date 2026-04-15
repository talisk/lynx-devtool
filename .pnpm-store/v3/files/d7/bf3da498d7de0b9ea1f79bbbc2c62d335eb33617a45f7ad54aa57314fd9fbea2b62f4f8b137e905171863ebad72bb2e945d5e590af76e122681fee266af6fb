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
var buildWatch_exports = {};
__export(buildWatch_exports, {
  BuildWatchEmitter: () => BuildWatchEmitter,
  BuildWatchEvent: () => BuildWatchEvent,
  buildWatch: () => buildWatch,
  runBuildWatch: () => runBuildWatch
});
module.exports = __toCommonJS(buildWatch_exports);
var Event = __toESM(require("events"));
var path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_build = require("./build");
var import_compilerErrorResult = require("./compilerErrorResult");
const BuildWatchEvent = {
  firstCompiler: "first-compiler",
  compiling: "compiling",
  watchingCompiler: "watching-compiler"
};
class BuildWatchEmitter extends Event.EventEmitter {
  setInitFn(fn) {
    this._initFn = fn;
  }
  async watch() {
    if (typeof this._initFn === "function") {
      return this._initFn(this);
    }
    return null;
  }
}
const runBuildWatch = async (option, babelConfig = {}, emitter) => {
  emitter.emit(BuildWatchEvent.compiling);
  const errorResult = new import_compilerErrorResult.CompilerErrorResult();
  const watchDir = option.watchDir;
  const { distDir, quiet } = option;
  const firstBuildResult = await (0, import_build.build)(option, babelConfig);
  const { code } = firstBuildResult;
  if (code === 1) {
    errorResult.init(firstBuildResult);
    emitter.emit(BuildWatchEvent.firstCompiler, errorResult.value);
  } else {
    emitter.emit(BuildWatchEvent.firstCompiler, firstBuildResult);
  }
  return (0, import_utils.watch)(`${watchDir}/**/*.{js,jsx,ts,tsx}`, async ({ changeType, changedFilePath }) => {
    emitter.emit(BuildWatchEvent.compiling);
    if (changeType === import_utils.WatchChangeType.UNLINK) {
      const removeFiles = [
        path.normalize(`./${distDir}/${path.relative(watchDir, changedFilePath)}`)
      ];
      if (!quiet) {
        import_utils.logger.info(`remove file: ${removeFiles.join(",")}`);
      }
      const result2 = {
        code: 0,
        message: `remove file: ${removeFiles.join(",")}`,
        removeFiles
      };
      emitter.emit(BuildWatchEvent.watchingCompiler, result2);
      return;
    }
    const result = await (0, import_build.build)({
      ...option,
      filenames: [
        changedFilePath
      ]
    }, babelConfig);
    if (result.code === 1) {
      errorResult.update(result.messageDetails || []);
      emitter.emit(BuildWatchEvent.watchingCompiler, errorResult.value);
      !quiet && import_utils.logger.info(errorResult.value.message);
    } else {
      errorResult.removeByFileName(changedFilePath);
      if (errorResult.checkExistError()) {
        emitter.emit(BuildWatchEvent.watchingCompiler, {
          ...errorResult.value,
          virtualDists: result.virtualDists
        });
        !quiet && import_utils.logger.info(errorResult.value.message);
      } else {
        emitter.emit(BuildWatchEvent.watchingCompiler, result);
        !quiet && import_utils.logger.info(result.message);
      }
    }
  }, [
    `${watchDir}/**/*.d.ts`
  ]);
};
const buildWatch = (option, babelConfig = {}) => {
  const buildWatchEmitter = new BuildWatchEmitter();
  buildWatchEmitter.setInitFn(runBuildWatch.bind(null, option, babelConfig));
  return buildWatchEmitter;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BuildWatchEmitter,
  BuildWatchEvent,
  buildWatch,
  runBuildWatch
});
