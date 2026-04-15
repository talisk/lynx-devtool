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
var runner_exports = {};
__export(runner_exports, {
  getGlobalRunner: () => getGlobalRunner,
  setGlobalRunner: () => setGlobalRunner
});
module.exports = __toCommonJS(runner_exports);
var import_base = require("./base");
let globalRunner;
function setGlobalRunner(runner) {
  globalRunner = runner;
}
function getGlobalRunner() {
  if (globalRunner) {
    return globalRunner;
  }
  const runner = import_base.runtime.init();
  setGlobalRunner(runner);
  return runner;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGlobalRunner,
  setGlobalRunner
});
