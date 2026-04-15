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
var config_exports = {};
__export(config_exports, {
  buildServerConfig: () => buildServerConfig,
  defineServerConfig: () => defineServerConfig,
  emitResolvedConfig: () => emitResolvedConfig
});
module.exports = __toCommonJS(config_exports);
var path = __toESM(require("path"));
var import_node_bundle_require = require("@modern-js/node-bundle-require");
var import_utils = require("@modern-js/utils");
var import_flatted = require("flatted");
const defineServerConfig = (config) => config;
const buildServerConfig = async ({ appDirectory, distDirectory, configFile, options, watch }) => {
  const configFilePath = await (0, import_utils.getServerConfig)(appDirectory, configFile);
  const getOutputFile = async (filepath) => path.resolve(distDirectory, `${filepath.replace(new RegExp(import_utils.CONFIG_FILE_EXTENSIONS.join("|")), "")}.cjs`);
  if (configFilePath) {
    const configHelperFilePath = path.normalize(path.join(distDirectory, "./config-helper.js"));
    const helperCode = `
      export const defineConfig = (config) => config;
    `;
    await import_utils.fs.ensureDir(distDirectory);
    await import_utils.fs.writeFile(configHelperFilePath, helperCode);
    await (0, import_node_bundle_require.bundle)(configFilePath, {
      ...options,
      watch,
      getOutputFile,
      esbuildPlugins: [
        {
          name: "native-build-config",
          setup(ctx) {
            ctx.onResolve({
              filter: /app-tools\/server/
            }, () => {
              return {
                path: configHelperFilePath
              };
            });
          }
        }
      ]
    });
  }
};
const emitResolvedConfig = async (appDirectory, resolvedConfig) => {
  var _resolvedConfig_output_distPath;
  const outputPath = (0, import_utils.ensureAbsolutePath)(appDirectory, path.join(((_resolvedConfig_output_distPath = resolvedConfig.output.distPath) === null || _resolvedConfig_output_distPath === void 0 ? void 0 : _resolvedConfig_output_distPath.root) || "./dist", import_utils.OUTPUT_CONFIG_FILE));
  const output = (0, import_flatted.stringify)(resolvedConfig);
  await import_utils.fs.writeFile(outputPath, output, {
    encoding: "utf-8"
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildServerConfig,
  defineServerConfig,
  emitResolvedConfig
});
