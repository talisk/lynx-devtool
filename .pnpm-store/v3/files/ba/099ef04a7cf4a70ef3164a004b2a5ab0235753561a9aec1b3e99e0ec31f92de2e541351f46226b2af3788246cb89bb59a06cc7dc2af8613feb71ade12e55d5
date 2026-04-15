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
var fileReader_exports = {};
__export(fileReader_exports, {
  FileReader: () => FileReader,
  fileReader: () => fileReader
});
module.exports = __toCommonJS(fileReader_exports);
var import_fs_extra = __toESM(require("@modern-js/utils/fs-extra"));
var import_storer = require("./storer");
class FileReader {
  async readFile(path, encoding = "utf-8") {
    const { fs } = this;
    const cache = await this.storage.get(path);
    if (cache === null) {
      return null;
    }
    if (cache) {
      return this.encodingContent(cache, encoding);
    }
    const isExistFile = await new Promise((resolve) => {
      fs.stat(path, (err, stats) => {
        if (err) {
          resolve(false);
          return;
        }
        if (stats.isFile()) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
    if (isExistFile) {
      const content = await fs.promises.readFile(path);
      this.storage.set(path, content);
      return this.encodingContent(content, encoding);
    } else {
      this.storage.set(path, null);
      return null;
    }
  }
  /**
  * Clear the fileCache entriely.
  */
  reset(fs) {
    var _this_storage_clear, _this_storage;
    fs && (this.fs = fs);
    return (_this_storage_clear = (_this_storage = this.storage).clear) === null || _this_storage_clear === void 0 ? void 0 : _this_storage_clear.call(_this_storage);
  }
  encodingContent(value, encoding) {
    if (encoding === "utf-8") {
      return value.toString();
    }
    return value;
  }
  constructor(storage) {
    this.fs = import_fs_extra.default;
    this.storage = storage;
  }
}
const fileReader = new FileReader((0, import_storer.createMemoryStorage)("__file__system"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FileReader,
  fileReader
});
