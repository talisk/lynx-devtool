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
var createRequest_exports = {};
__export(createRequest_exports, {
  createActionRequest: () => createActionRequest,
  createRequest: () => createRequest,
  getRequestUrl: () => getRequestUrl
});
module.exports = __toCommonJS(createRequest_exports);
var import_router = require("@modern-js/runtime-utils/router");
var import_path_to_regexp = require("path-to-regexp");
var import_constants = require("../common/constants");
var import_data = require("./data");
const getRequestUrl = ({ params, request, routeId }) => {
  const url = new URL(request.url);
  const toPath = (0, import_path_to_regexp.compile)(url.pathname, {
    encode: encodeURIComponent
  });
  const newPathName = toPath(params);
  url.pathname = newPathName;
  url.searchParams.append(import_constants.LOADER_ID_PARAM, routeId);
  url.searchParams.append(import_constants.DIRECT_PARAM, "true");
  return url;
};
const handleRedirectResponse = (res) => {
  const { headers } = res;
  const location = headers.get("X-Modernjs-Redirect");
  if (location) {
    throw (0, import_router.redirect)(location);
  }
  return res;
};
const handleDeferredResponse = async (res) => {
  var _res_headers_get;
  if (((_res_headers_get = res.headers.get("Content-Type")) === null || _res_headers_get === void 0 ? void 0 : _res_headers_get.match(import_constants.CONTENT_TYPE_DEFERRED)) && res.body) {
    return await (0, import_data.parseDeferredReadableStream)(res.body);
  }
  return res;
};
const isErrorResponse = (res) => {
  return res.headers.get("X-Modernjs-Error") != null;
};
const handleErrorResponse = async (res) => {
  if (isErrorResponse(res)) {
    const data = await res.json();
    const error = new Error(data.message);
    error.stack = data.stack;
    throw error;
  }
  return res;
};
const createRequest = (routeId, method = "get") => {
  return async ({ params, request }) => {
    const url = getRequestUrl({
      params,
      request,
      routeId
    });
    let res;
    res = await fetch(url, {
      method,
      signal: request.signal
    });
    res = handleRedirectResponse(res);
    res = await handleErrorResponse(res);
    res = await handleDeferredResponse(res);
    return res;
  };
};
const createActionRequest = (routeId) => {
  return async ({ params, request }) => {
    const url = getRequestUrl({
      params,
      request,
      routeId
    });
    const init = {
      signal: request.signal
    };
    if (request.method !== "GET") {
      init.method = request.method;
      const contentType = request.headers.get("Content-Type");
      if (contentType && /\bapplication\/json\b/.test(contentType)) {
        init.headers = {
          "Content-Type": contentType
        };
        init.body = JSON.stringify(await request.json());
      } else if (contentType && /\btext\/plain\b/.test(contentType)) {
        init.headers = {
          "Content-Type": contentType
        };
        init.body = await request.text();
      } else if (contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)) {
        init.body = new URLSearchParams(await request.text());
      } else {
        init.body = await request.formData();
      }
    }
    const res = await fetch(url, init);
    if (!res.ok) {
      throw res;
    }
    return res;
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createActionRequest,
  createRequest,
  getRequestUrl
});
