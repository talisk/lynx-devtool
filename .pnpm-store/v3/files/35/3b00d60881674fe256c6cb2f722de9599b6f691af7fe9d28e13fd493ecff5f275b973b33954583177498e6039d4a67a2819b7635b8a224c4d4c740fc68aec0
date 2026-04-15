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
var statsCache_exports = {};
__export(statsCache_exports, {
  StatsCache: () => StatsCache
});
module.exports = __toCommonJS(statsCache_exports);
var import_crypto = __toESM(require("crypto"));
var import_fs = __toESM(require("fs"));
class StatsCache {
  add(files) {
    const { cachedHash, cachedSize } = this;
    for (const filename of files) {
      if (import_fs.default.existsSync(filename)) {
        const stats = import_fs.default.statSync(filename);
        if (stats.isFile() && !cachedHash[filename]) {
          cachedHash[filename] = this.hash(stats, filename);
          cachedSize[filename] = stats.size;
        }
      }
    }
  }
  refresh(filename) {
    const { cachedHash, cachedSize } = this;
    if (import_fs.default.existsSync(filename)) {
      const stats = import_fs.default.statSync(filename);
      if (stats.isFile()) {
        cachedHash[filename] = this.hash(stats, filename);
        cachedSize[filename] = stats.size;
      }
    }
  }
  del(filename) {
    if (this.cachedHash[filename]) {
      delete this.cachedHash[filename];
      delete this.cachedSize[filename];
    }
  }
  isDiff(filename) {
    const { cachedHash, cachedSize } = this;
    const stats = import_fs.default.statSync(filename);
    const hash = cachedHash[filename];
    const size = cachedSize[filename];
    if (stats.size !== size) {
      return true;
    }
    if (this.hash(stats, filename) !== hash) {
      return true;
    }
    return false;
  }
  has(filename) {
    return Boolean(this.cachedHash[filename]);
  }
  hash(stats, filename) {
    return import_crypto.default.createHash("md5").update(import_fs.default.readFileSync(filename)).digest("hex");
  }
  constructor() {
    this.cachedHash = {};
    this.cachedSize = {};
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StatsCache
});
