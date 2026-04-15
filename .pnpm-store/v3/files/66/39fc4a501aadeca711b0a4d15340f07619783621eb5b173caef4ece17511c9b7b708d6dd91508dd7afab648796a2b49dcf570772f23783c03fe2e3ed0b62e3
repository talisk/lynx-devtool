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
var routerApi_exports = {};
__export(routerApi_exports, {
  RouterAPI: () => RouterAPI
});
module.exports = __toCommonJS(routerApi_exports);
class RouterAPI {
  redirect(url, status = 302) {
    this.url = url;
    this.status = status;
  }
  rewrite(entryName) {
    this.current = entryName;
  }
  use(entryName) {
    this.rewrite(entryName);
  }
  constructor(entryName) {
    this.current = entryName;
    this.status = 200;
    this.url = "";
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  RouterAPI
});
