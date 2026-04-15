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
var request_exports = {};
__export(request_exports, {
  getHost: () => getHost,
  getPathname: () => getPathname,
  parseCookie: () => parseCookie,
  parseHeaders: () => parseHeaders,
  parseQuery: () => parseQuery
});
module.exports = __toCommonJS(request_exports);
function parseQuery(req) {
  const query = {};
  const { url } = req;
  const q = url.split("?")[1];
  if (q) {
    const search = new URLSearchParams(q);
    search.forEach((v, k) => {
      query[k] = v;
    });
  }
  return query;
}
function parseHeaders(request) {
  const headersData = {};
  request.headers.forEach((value, key) => {
    headersData[key] = value;
  });
  return headersData;
}
function getPathname(request) {
  const match = request.url.match(/^https?:\/\/[^/]+(\/[^?]*)/);
  return match ? match[1] : "/";
}
function getHost(request) {
  const { headers } = request;
  let host = headers.get("X-Forwarded-Host");
  if (!host) {
    host = headers.get("Host");
  }
  host = (host === null || host === void 0 ? void 0 : host.split(/\s*,\s*/, 1)[0]) || "undefined";
  return host;
}
function parseCookie(req) {
  const _cookie = req.headers.get("Cookie");
  const cookie = {};
  _cookie === null || _cookie === void 0 ? void 0 : _cookie.trim().split(";").forEach((item) => {
    const [k, v] = item.trim().split("=");
    if (k) {
      cookie[k] = v;
    }
  });
  return cookie;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHost,
  getPathname,
  parseCookie,
  parseHeaders,
  parseQuery
});
