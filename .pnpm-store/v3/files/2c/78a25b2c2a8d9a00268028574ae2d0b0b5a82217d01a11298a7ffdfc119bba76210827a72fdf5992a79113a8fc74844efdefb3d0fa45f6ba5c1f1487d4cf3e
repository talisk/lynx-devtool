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
var storage_exports = {};
__export(storage_exports, {
  createStorage: () => createStorage
});
module.exports = __toCommonJS(storage_exports);
var ah = __toESM(require("async_hooks"));
const createStorage = () => {
  let storage;
  if (typeof ah.AsyncLocalStorage !== "undefined") {
    storage = new ah.AsyncLocalStorage();
  }
  const run = (context, cb) => {
    if (!storage) {
      throw new Error(`Unable to use async_hook, please confirm the node version >= 12.17
        `);
    }
    return new Promise((resolve, reject) => {
      storage.run(context, () => {
        try {
          return resolve(cb());
        } catch (error) {
          return reject(error);
        }
      });
    });
  };
  const useContext = () => {
    if (!storage) {
      throw new Error(`Unable to use async_hook, please confirm the node version >= 12.17
        `);
    }
    const context = storage.getStore();
    if (!context) {
      throw new Error(`Can't call useContext out of scope, make sure @modern-js/utils is a single version in node_modules`);
    }
    return context;
  };
  return {
    run,
    useContext
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createStorage
});
