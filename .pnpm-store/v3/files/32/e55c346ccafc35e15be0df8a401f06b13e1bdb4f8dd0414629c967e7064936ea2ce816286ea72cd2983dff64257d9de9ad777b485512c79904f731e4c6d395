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
var getSelectedEntries_exports = {};
__export(getSelectedEntries_exports, {
  getSelectedEntries: () => getSelectedEntries
});
module.exports = __toCommonJS(getSelectedEntries_exports);
var import_utils = require("@modern-js/utils");
var import_locale = require("../locale");
const getSelectedEntries = async (entry, entrypoints) => {
  const entryNames = entrypoints.map((e) => e.entryName);
  if (!entry) {
    return entryNames;
  }
  if (typeof entry === "boolean") {
    const { selected } = await import_utils.inquirer.prompt([
      {
        type: "checkbox",
        name: "selected",
        choices: entryNames,
        message: import_locale.i18n.t(import_locale.localeKeys.command.dev.selectEntry),
        validate(answer) {
          if (answer.length < 1) {
            return import_locale.i18n.t(import_locale.localeKeys.command.dev.requireEntry);
          }
          return true;
        }
      }
    ]);
    return selected;
  }
  entry.forEach((name) => {
    if (!entryNames.includes(name)) {
      throw new Error(`Can not found entry ${import_utils.chalk.yellow(name)}, the entry should be one of ${import_utils.chalk.yellow(entryNames.join(", "))}`);
    }
  });
  return entry;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSelectedEntries
});
