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
var checkIsDuplicationPlugin_exports = {};
__export(checkIsDuplicationPlugin_exports, {
  checkIsDuplicationPlugin: () => checkIsDuplicationPlugin
});
module.exports = __toCommonJS(checkIsDuplicationPlugin_exports);
var import_utils = require("@modern-js/utils");
function checkIsDuplicationPlugin(plugins, autoLoadPlugin = false) {
  const set = /* @__PURE__ */ new Set();
  const duplicationPlugins = [];
  plugins.filter((plugin) => typeof plugin === "string").forEach((plugin) => {
    if (set.has(plugin)) {
      duplicationPlugins.push(plugin);
    } else {
      set.add(plugin);
    }
  });
  if (duplicationPlugins.length > 0) {
    import_utils.logger.warn(`Duplicate registration plugins: ${duplicationPlugins.join(",")}.`);
    if (autoLoadPlugin) {
      import_utils.logger.warn("This is probably because you enabled `autoLoadPlugin` configuration and also registered these plugins manually");
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIsDuplicationPlugin
});
