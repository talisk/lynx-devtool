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
var handler_exports = {};
__export(handler_exports, {
  handleFileChange: () => handleFileChange,
  handleGeneratorEntryCode: () => handleGeneratorEntryCode,
  handleModifyEntrypoints: () => handleModifyEntrypoints
});
module.exports = __toCommonJS(handler_exports);
var import_path = __toESM(require("path"));
var import_lodash = require("@modern-js/utils/lodash");
var templates = __toESM(require("./code/templates"));
var import_utils = require("./code/utils");
var import_entry = require("./entry");
let originEntrypoints = [];
async function handleModifyEntrypoints(api, entrypoints) {
  const config = api.useResolvedConfigContext();
  return (0, import_entry.modifyEntrypoints)(entrypoints, config);
}
async function handleGeneratorEntryCode(api, entrypoints) {
  const appContext = api.useAppContext();
  const { internalDirectory } = api.useAppContext();
  const resolvedConfig = api.useResolvedConfigContext();
  const { generatorRegisterCode, generateCode } = await Promise.resolve().then(() => __toESM(require("./code")));
  originEntrypoints = (0, import_lodash.cloneDeep)(entrypoints);
  await generateCode(appContext, resolvedConfig, entrypoints, api);
  await Promise.all(entrypoints.map(async (entrypoint) => {
    if (entrypoint.nestedRoutesEntry || entrypoint.pageRoutesEntry) {
      var _entrypoint_fileSystemRoutes;
      generatorRegisterCode(internalDirectory, entrypoint.entryName, await templates.runtimeGlobalContext({
        metaName: appContext.metaName,
        srcDirectory: appContext.srcDirectory,
        nestedRoutesEntry: entrypoint.nestedRoutesEntry,
        internalSrcAlias: appContext.internalSrcAlias,
        globalApp: (_entrypoint_fileSystemRoutes = entrypoint.fileSystemRoutes) === null || _entrypoint_fileSystemRoutes === void 0 ? void 0 : _entrypoint_fileSystemRoutes.globalApp
      }));
    }
  }));
  return entrypoints;
}
async function handleFileChange(api, e) {
  const appContext = api.useAppContext();
  const { appDirectory, entrypoints } = appContext;
  const { filename, eventType } = e;
  const nestedRouteEntries = entrypoints.map((point) => point.nestedRoutesEntry).filter(Boolean);
  const pagesDir = entrypoints.map((point) => point.entry).filter((entry) => entry && !import_path.default.extname(entry)).concat(nestedRouteEntries);
  const isPageFile = (name) => pagesDir.some((pageDir) => name.includes(pageDir));
  const absoluteFilePath = import_path.default.resolve(appDirectory, filename);
  const isRouteComponent = isPageFile(absoluteFilePath) && (0, import_utils.isPageComponentFile)(absoluteFilePath);
  if (isRouteComponent && (eventType === "add" || eventType === "unlink")) {
    const resolvedConfig = api.useResolvedConfigContext();
    const { generateCode } = await Promise.resolve().then(() => __toESM(require("./code")));
    const entrypoints2 = (0, import_lodash.cloneDeep)(originEntrypoints);
    await generateCode(appContext, resolvedConfig, entrypoints2, api);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleFileChange,
  handleGeneratorEntryCode,
  handleModifyEntrypoints
});
