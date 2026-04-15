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
var middlewareCollector_exports = {};
__export(middlewareCollector_exports, {
  createMiddlewareCollecter: () => createMiddlewareCollecter,
  mergeExtension: () => mergeExtension
});
module.exports = __toCommonJS(middlewareCollector_exports);
const mergeExtension = (users) => {
  const output = [];
  return {
    middleware: output.concat(users)
  };
};
const createMiddlewareCollecter = () => {
  const webMiddlewares = [];
  const apiMiddlewares = [];
  const addWebMiddleware = (input) => {
    webMiddlewares.push(input);
  };
  const addAPIMiddleware = (input) => {
    apiMiddlewares.push(input);
  };
  const getMiddlewares = () => ({
    web: webMiddlewares,
    api: apiMiddlewares
  });
  return {
    getMiddlewares,
    addWebMiddleware,
    addAPIMiddleware
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMiddlewareCollecter,
  mergeExtension
});
