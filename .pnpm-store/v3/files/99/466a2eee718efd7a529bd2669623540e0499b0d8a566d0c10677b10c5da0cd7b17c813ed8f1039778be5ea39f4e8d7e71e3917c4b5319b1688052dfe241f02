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
var emitRouteFile_exports = {};
__export(emitRouteFile_exports, {
  isFileExists: () => isFileExists,
  pluginEmitRouteFile: () => pluginEmitRouteFile
});
module.exports = __toCommonJS(emitRouteFile_exports);
var import_node_fs = __toESM(require("node:fs"));
var import_node_path = require("node:path");
async function isFileExists(file) {
  return import_node_fs.default.promises.access(file, import_node_fs.default.constants.F_OK).then(() => true).catch(() => false);
}
const pluginEmitRouteFile = () => ({
  name: "uni-builder:emit-route-file",
  setup(api) {
    api.onBeforeStartDevServer(async ({ environments }) => {
      const { fs: fs2, ROUTE_SPEC_FILE } = await Promise.resolve().then(() => __toESM(require("@modern-js/utils")));
      const routeFilePath = (0, import_node_path.join)(api.context.distPath, ROUTE_SPEC_FILE);
      const htmlPaths = Object.values(environments).reduce((prev, curr) => {
        return {
          ...prev,
          ...curr.htmlPaths
        };
      }, {});
      const routesInfo = Object.entries(htmlPaths).map(([entryName, filename], index) => ({
        urlPath: index === 0 ? "/" : `/${entryName}`,
        entryName,
        entryPath: filename,
        isSPA: true
      }));
      if (!await isFileExists(routeFilePath) && routesInfo.length) {
        await fs2.outputFile(routeFilePath, JSON.stringify({
          routes: routesInfo
        }, null, 2));
      }
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFileExists,
  pluginEmitRouteFile
});
