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
var install_exports = {};
__export(install_exports, {
  installGlobals: () => installGlobals
});
module.exports = __toCommonJS(install_exports);
var import_fetch = require("@web-std/fetch");
var import_file = require("@web-std/file");
var import_stream = require("@web-std/stream");
if (!Object.getOwnPropertyDescriptor(import_fetch.Headers.prototype, "getSetCookie")) {
  Object.defineProperty(import_fetch.Headers.prototype, "getSetCookie", {
    value: function getSetCookie() {
      const cookies = [];
      this.forEach((value, name) => {
        if (name.toLowerCase() === "set-cookie") {
          cookies.push(value);
        }
      });
      return cookies;
    }
  });
}
const installGlobals = () => {
  if (!global.Headers) {
    global.Headers = import_fetch.Headers;
  }
  if (!global.Request) {
    global.Request = import_fetch.Request;
  }
  if (!global.Response) {
    global.Response = import_fetch.Response;
  }
  if (!global.FormData) {
    global.FormData = import_fetch.FormData;
  }
  if (!global.TransformStream) {
    global.TransformStream = import_stream.TransformStream;
  }
  if (!global.ReadableStream) {
    global.ReadableStream = import_stream.ReadableStream;
  }
  if (!global.WritableStream) {
    global.WritableStream = import_stream.WritableStream;
  }
  if (!global.File) {
    global.File = import_file.File;
  }
  if (!global.Blob) {
    global.Blob = import_file.Blob;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  installGlobals
});
