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
var storer_exports = {};
__export(storer_exports, {
  Storage: () => import_storage2.Storage,
  createMemoryStorage: () => createMemoryStorage
});
module.exports = __toCommonJS(storer_exports);
var import_container = require("./container");
var import_storage = require("./storage");
var import_storage2 = require("./storage");
const memoryContainer = new import_container.MemoryContainer();
function createMemoryStorage(namespace) {
  return new import_storage.Storage(namespace, memoryContainer);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Storage,
  createMemoryStorage
});
