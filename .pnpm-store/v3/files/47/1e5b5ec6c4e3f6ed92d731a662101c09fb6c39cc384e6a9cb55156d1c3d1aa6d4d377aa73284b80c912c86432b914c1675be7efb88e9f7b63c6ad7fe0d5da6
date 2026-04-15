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
var loader_exports = {};
__export(loader_exports, {
  default: () => loader
});
module.exports = __toCommonJS(loader_exports);
var import_util = require("util");
var import_logger = require("@modern-js/utils/logger");
var import_generateClient = require("./generateClient");
async function loader(source) {
  var _this__compiler;
  this.cacheable();
  const target = (_this__compiler = this._compiler) === null || _this__compiler === void 0 ? void 0 : _this__compiler.options.target;
  const shouldSkip = (compileTarget) => {
    return target === compileTarget || Array.isArray(target) && target.includes(compileTarget);
  };
  if (shouldSkip("node") || shouldSkip("webworker") || shouldSkip("async-node")) {
    return source;
  }
  const { resourceQuery } = this;
  const options = resourceQuery.slice(1).split("&").reduce((pre, cur) => {
    const [key, value] = cur.split("=");
    if (key && value) {
      pre[key] = value === "true" ? true : value === "false" ? false : value;
    }
    return pre;
  }, {});
  if (!options.loaderId || options.retain) {
    return source;
  }
  if (options.clientData) {
    const readFile = (0, import_util.promisify)(this.fs.readFile);
    try {
      const clientDataPath = this.resourcePath.includes(".loader.") ? this.resourcePath.replace(".loader.", ".data.client.") : this.resourcePath.replace(".data.", ".data.client.");
      this.addDependency(clientDataPath);
      const clientDataContent = await readFile(clientDataPath);
      return clientDataContent;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        import_logger.logger.error(`Failed to read the clientData file ${options.clientData}`);
      }
    }
  }
  const code = (0, import_generateClient.generateClient)({
    inline: options.inline,
    action: options.action,
    routeId: options.routeId
  });
  return code;
}
