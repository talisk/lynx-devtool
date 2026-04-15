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
var default_exports = {};
__export(default_exports, {
  createDefaultPlugins: () => createDefaultPlugins
});
module.exports = __toCommonJS(default_exports);
var import_log = require("./log");
var import_monitors = require("./monitors");
var import_processedBy = require("./processedBy");
var import_render = require("./render");
function createDefaultPlugins(options = {}) {
  const plugins = [
    (0, import_monitors.initMonitorsPlugin)(),
    (0, import_render.injectRenderHandlerPlugin)(options),
    (0, import_monitors.injectloggerPluigin)(options.logger),
    (0, import_monitors.injectServerTiming)(),
    (0, import_log.logPlugin)(),
    (0, import_processedBy.processedByPlugin)()
  ];
  return plugins;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDefaultPlugins
});
