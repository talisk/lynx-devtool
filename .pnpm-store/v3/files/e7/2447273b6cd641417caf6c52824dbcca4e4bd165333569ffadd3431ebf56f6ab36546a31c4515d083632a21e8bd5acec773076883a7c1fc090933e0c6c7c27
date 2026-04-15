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
var container_exports = {};
__export(container_exports, {
  MemoryContainer: () => MemoryContainer
});
module.exports = __toCommonJS(container_exports);
var import_lru_cache = __toESM(require("lru-cache"));
class MemoryContainer {
  async get(key) {
    return this.cache.get(key);
  }
  async set(key, value) {
    this.cache.set(key, value);
    return this;
  }
  async has(key) {
    return this.cache.has(key);
  }
  async delete(key) {
    const exist = await this.has(key);
    if (exist) {
      this.cache.del(key);
    }
    return exist;
  }
  forEach(callbackFn) {
    this.cache.forEach((value, key) => {
      callbackFn(value, key, this);
    });
  }
  constructor({ max, maxAge } = {}) {
    this.cache = new import_lru_cache.default({
      max: (max || 256) * MemoryContainer.MB,
      maxAge: maxAge || MemoryContainer.hour
    });
  }
}
MemoryContainer.BYTE = 1;
MemoryContainer.KB = 1024 * MemoryContainer.BYTE;
MemoryContainer.MB = 1024 * MemoryContainer.KB;
MemoryContainer.ms = 1;
MemoryContainer.second = MemoryContainer.ms * 1e3;
MemoryContainer.minute = MemoryContainer.second * 60;
MemoryContainer.hour = MemoryContainer.minute * 60;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MemoryContainer
});
