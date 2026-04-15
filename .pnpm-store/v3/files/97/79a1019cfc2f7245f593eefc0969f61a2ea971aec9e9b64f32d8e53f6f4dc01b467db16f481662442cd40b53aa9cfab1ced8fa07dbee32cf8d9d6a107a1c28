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
var code_exports = {};
__export(code_exports, {
  generateCode: () => generateCode
});
module.exports = __toCommonJS(code_exports);
var import_path = __toESM(require("path"));
var import_utils = require("@modern-js/utils");
var import_constants = require("./constants");
var template = __toESM(require("./template"));
var serverTemplate = __toESM(require("./template.server"));
function getSSRMode(entry, config) {
  const { ssr, ssrByEntries } = config.server;
  if (config.output.ssg) {
    return "string";
  }
  return checkSSRMode((ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[entry]) || ssr);
  function checkSSRMode(ssr2) {
    if (!ssr2) {
      return false;
    }
    if (typeof ssr2 === "boolean") {
      return ssr2 ? "string" : false;
    }
    return ssr2.mode === "stream" ? "stream" : "string";
  }
}
const generateCode = async (entrypoints, appContext, config, onCollectRuntimePlugins) => {
  const { mountId } = config.html;
  const { enableAsyncEntry } = config.source;
  const { runtimeConfigFile, internalDirectory, internalSrcAlias, metaName, srcDirectory } = appContext;
  await Promise.all(entrypoints.map(async (entrypoint) => {
    const { entryName, isAutoMount, entry, customEntry, customBootstrap, customServerEntry } = entrypoint;
    const { plugins: runtimePlugins } = await onCollectRuntimePlugins({
      entrypoint,
      plugins: []
    });
    if (isAutoMount) {
      const indexCode = template.index({
        srcDirectory,
        internalSrcAlias,
        metaName,
        entry,
        entryName,
        customEntry,
        customBootstrap,
        mountId
      });
      const indexFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.ENTRY_POINT_FILE_NAME}`);
      import_utils.fs.outputFileSync(indexFile, indexCode, "utf8");
      const ssrMode = getSSRMode(entryName, config);
      if (enableAsyncEntry) {
        const bootstrapFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.ENTRY_BOOTSTRAP_FILE_NAME}`);
        import_utils.fs.outputFileSync(bootstrapFile, `import(/* webpackChunkName: "async-${entryName}" */ './${import_constants.INDEX_FILE_NAME}');`, "utf8");
        const bootstrapServerFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.ENTRY_SERVER_BOOTSTRAP_FILE_NAME}`);
        if (ssrMode) {
          import_utils.fs.outputFileSync(bootstrapServerFile, `export const requestHandler = import('./${import_constants.SERVER_ENTRY_POINT_FILE_NAME}').then((m) => m.requestHandler)`, "utf8");
        }
      }
      if (ssrMode) {
        const indexServerCode = serverTemplate.serverIndex({
          entry,
          entryName,
          internalSrcAlias,
          metaName,
          mode: ssrMode,
          customServerEntry,
          srcDirectory
        });
        const indexServerFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.SERVER_ENTRY_POINT_FILE_NAME}`);
        import_utils.fs.outputFileSync(indexServerFile, indexServerCode, "utf8");
      }
      const registerCode = template.register();
      const registerFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.ENTRY_POINT_REGISTER_FILE_NAME}`);
      import_utils.fs.outputFileSync(registerFile, registerCode, "utf8");
      const registerRuntimeCode = template.runtimeRegister({
        entryName,
        srcDirectory,
        internalSrcAlias,
        metaName,
        runtimeConfigFile,
        runtimePlugins
      });
      const registerRuntimeFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.ENTRY_POINT_RUNTIME_REGISTER_FILE_NAME}`);
      import_utils.fs.outputFileSync(registerRuntimeFile, registerRuntimeCode, "utf8");
      const contextCode = template.runtimeGlobalContext({
        srcDirectory,
        internalSrcAlias,
        metaName,
        entry,
        customEntry
      });
      const contextFile = import_path.default.resolve(internalDirectory, `./${entryName}/${import_constants.ENTRY_POINT_RUNTIME_GLOBAL_CONTEXT_FILE_NAME}`);
      import_utils.fs.outputFileSync(contextFile, contextCode, "utf8");
    }
  }));
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateCode
});
