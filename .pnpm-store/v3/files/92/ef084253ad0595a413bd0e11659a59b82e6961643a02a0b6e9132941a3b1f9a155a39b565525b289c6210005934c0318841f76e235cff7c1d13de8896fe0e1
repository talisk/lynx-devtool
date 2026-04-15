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
var commander_exports = {};
__export(commander_exports, {
  initCommandsMap: () => initCommandsMap,
  program: () => import_utils.program
});
module.exports = __toCommonJS(commander_exports);
var import_utils = require("@modern-js/utils");
function initCommandsMap() {
  if (!import_utils.program.hasOwnProperty("commandsMap")) {
    Object.defineProperty(import_utils.program, "commandsMap", {
      get() {
        const map = /* @__PURE__ */ new Map();
        for (const command of import_utils.program.commands) {
          map.set(command._name, command);
        }
        return map;
      },
      configurable: false
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initCommandsMap,
  program
});
