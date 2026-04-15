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
var watcher_exports = {};
__export(watcher_exports, {
  default: () => Watcher,
  defaultWatchOptions: () => defaultWatchOptions,
  getWatchedFiles: () => getWatchedFiles,
  mergeWatchOptions: () => mergeWatchOptions
});
module.exports = __toCommonJS(watcher_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_dependencyTree = require("./dependencyTree");
var import_statsCache = require("./statsCache");
const defaultWatchOptions = {
  // 初始化的时候不触发 add、addDir 事件
  ignoreInitial: true,
  ignored: /api\/typings\/.*/
};
const getWatchedFiles = (watcher) => {
  const watched = watcher.getWatched();
  const files = [];
  Object.keys(watched).forEach((dir) => {
    watched[dir].forEach((fileName) => {
      files.push(import_path.default.join(dir, fileName));
    });
  });
  return files;
};
const mergeWatchOptions = (options) => {
  const watchOptions = {
    ...options
  };
  if (watchOptions) {
    const { ignored } = watchOptions;
    const finalIgnored = ignored ? [
      defaultWatchOptions.ignored,
      ...Array.isArray(ignored) ? ignored : [
        ignored
      ]
    ] : ignored;
    if (finalIgnored) {
      watchOptions.ignored = finalIgnored;
    }
  }
  const finalWatchOptions = {
    ...defaultWatchOptions,
    ...watchOptions
  };
  return finalWatchOptions;
};
class Watcher {
  listen(files, options, callback) {
    const watched = files.filter(Boolean);
    const filenames = watched.map((filename) => filename.replace(/\\/g, "/"));
    const cache = new import_statsCache.StatsCache();
    const watcher = import_utils.chokidar.watch(filenames, options);
    watcher.on("ready", () => {
      cache.add(getWatchedFiles(watcher));
    });
    watcher.on("change", (changed) => {
      if (!import_utils.fs.existsSync(changed) || cache.isDiff(changed)) {
        cache.refresh(changed);
        callback(changed, "change");
      }
    });
    watcher.on("add", (changed) => {
      if (!cache.has(changed)) {
        cache.add([
          changed
        ]);
        callback(changed, "add");
      }
    });
    watcher.on("unlink", (changed) => {
      cache.del(changed);
      callback(changed, "unlink");
    });
    this.watcher = watcher;
  }
  createDepTree() {
    this.dependencyTree = new import_dependencyTree.DependencyTree();
  }
  updateDepTree() {
    var _this_dependencyTree;
    (_this_dependencyTree = this.dependencyTree) === null || _this_dependencyTree === void 0 ? void 0 : _this_dependencyTree.update(require.cache);
  }
  cleanDepCache(filepath) {
    var _this_dependencyTree;
    const node = (_this_dependencyTree = this.dependencyTree) === null || _this_dependencyTree === void 0 ? void 0 : _this_dependencyTree.getNode(filepath);
    if (node && require.cache[filepath]) {
      delete require.cache[filepath];
      for (const parentNode of node.parent.values()) {
        this.cleanDepCache(parentNode.module.filename);
      }
    }
  }
  close() {
    return this.watcher.close();
  }
  constructor() {
    this.dependencyTree = null;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  defaultWatchOptions,
  getWatchedFiles,
  mergeWatchOptions
});
