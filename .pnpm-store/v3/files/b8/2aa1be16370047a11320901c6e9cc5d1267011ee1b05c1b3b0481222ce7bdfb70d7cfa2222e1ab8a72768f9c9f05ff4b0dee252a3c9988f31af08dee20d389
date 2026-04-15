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
var mock_exports = {};
__export(mock_exports, {
  getMatched: () => getMatched,
  getMockMiddleware: () => getMockMiddleware,
  initOrUpdateMockMiddlewares: () => initOrUpdateMockMiddlewares
});
module.exports = __toCommonJS(mock_exports);
var import_node_path = __toESM(require("node:path"));
var import_server_core = require("@modern-js/server-core");
var import_node = require("@modern-js/server-core/node");
var import_utils = require("@modern-js/utils");
var import_path_to_regexp = require("path-to-regexp");
let mockAPIs = [];
let mockConfig;
const parseKey = (key) => {
  const _blank = " ";
  const splitted = key.split(_blank).filter(Boolean);
  if (splitted.length > 1) {
    const [method, pathname] = splitted;
    return {
      method: method.toLowerCase(),
      path: pathname
    };
  }
  return {
    method: "get",
    path: key
  };
};
const getMockModule = async (pwd) => {
  const exts = [
    ".ts",
    ".js"
  ];
  let mockFilePath = "";
  for (const ext of exts) {
    const maybeMatch = import_node_path.default.join(pwd, `${import_server_core.AGGRED_DIR.mock}/index${ext}`);
    if (await import_utils.fs.pathExists(maybeMatch)) {
      mockFilePath = maybeMatch;
      break;
    }
  }
  if (!mockFilePath) {
    return void 0;
  }
  const { default: mockHandlers, config } = await Promise.resolve().then(() => __toESM(require(mockFilePath)));
  const enable = config === null || config === void 0 ? void 0 : config.enable;
  if (enable === false) {
    return void 0;
  }
  if (!mockHandlers) {
    throw new Error(`Mock file ${mockFilePath} parsed failed!`);
  }
  return {
    mockHandlers,
    config
  };
};
const getMatched = (request, mockApis) => {
  const { path: targetPathname, method: targetMethod } = request;
  const matched = mockApis.find((mockApi) => {
    const { method, path: pathname } = mockApi;
    if (method.toLowerCase() === targetMethod.toLowerCase()) {
      return (0, import_path_to_regexp.match)(pathname, {
        encode: encodeURI,
        decode: decodeURIComponent
      })(targetPathname);
    }
    return false;
  });
  return matched;
};
async function initOrUpdateMockMiddlewares(pwd) {
  const mockModule = await getMockModule(pwd);
  mockConfig = mockModule === null || mockModule === void 0 ? void 0 : mockModule.config;
  mockAPIs = Object.entries((mockModule === null || mockModule === void 0 ? void 0 : mockModule.mockHandlers) || {}).map(([key, handler]) => {
    const { method, path: path2 } = parseKey(key);
    return {
      method,
      path: path2,
      handler
    };
  });
}
async function getMockMiddleware(pwd) {
  await initOrUpdateMockMiddlewares(pwd);
  const mockMiddleware = async (c, next) => {
    if (typeof (mockConfig === null || mockConfig === void 0 ? void 0 : mockConfig.enable) === "function") {
      const isEnabled = mockConfig.enable(c.env.node.req, c.env.node.res);
      if (!isEnabled) {
        return next();
      }
    }
    const matchedMockAPI = getMatched(c.req, mockAPIs);
    if (matchedMockAPI) {
      const { handler } = matchedMockAPI;
      if (typeof handler === "function") {
        return await (0, import_node.connectMid2HonoMid)(handler)(c, next);
      } else {
        return c.json(handler);
      }
    }
    return next();
  };
  return mockMiddleware;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMatched,
  getMockMiddleware,
  initOrUpdateMockMiddlewares
});
