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
var base_exports = {};
__export(base_exports, {
  generateBaseConfig: () => generateBaseConfig
});
module.exports = __toCommonJS(base_exports);
const generateBaseConfig = (options = {}) => {
  var _config_plugins;
  const config = {
    presets: [],
    plugins: []
  };
  const { presetEnv = {}, presetTypeScript = {}, pluginDecorators = false } = options;
  if (presetEnv) {
    var _config_presets;
    var _presetEnv_include;
    (_config_presets = config.presets) === null || _config_presets === void 0 ? void 0 : _config_presets.push([
      require.resolve("@babel/preset-env"),
      {
        // Jest only supports commonjs
        modules: process.env.NODE_ENV === "test" ? "commonjs" : false,
        exclude: [
          "transform-typeof-symbol"
        ],
        ...presetEnv,
        // If you are using @babel/preset-env and legacy decorators, you must ensure the class elements transform is enabled regardless of your targets, because Babel only supports compiling legacy decorators when also compiling class properties:
        // see https://babeljs.io/docs/babel-plugin-proposal-decorators#legacy
        ...pluginDecorators && pluginDecorators.version === "legacy" ? {
          include: [
            "@babel/plugin-transform-class-properties",
            ...(_presetEnv_include = presetEnv === null || presetEnv === void 0 ? void 0 : presetEnv.include) !== null && _presetEnv_include !== void 0 ? _presetEnv_include : []
          ]
        } : {}
      }
    ]);
  }
  if (presetTypeScript) {
    var _config_presets1;
    (_config_presets1 = config.presets) === null || _config_presets1 === void 0 ? void 0 : _config_presets1.push([
      require.resolve("@babel/preset-typescript"),
      {
        isTSX: true,
        allExtensions: true,
        allowNamespaces: true,
        allowDeclareFields: true,
        // aligns Babel's behavior with TypeScript's default behavior.
        // https://babeljs.io/docs/en/babel-preset-typescript#optimizeconstenums
        optimizeConstEnums: true,
        ...presetTypeScript
      }
    ]);
  }
  if (pluginDecorators) {
    var _config_plugins1;
    (_config_plugins1 = config.plugins) === null || _config_plugins1 === void 0 ? void 0 : _config_plugins1.push([
      require.resolve("@babel/plugin-proposal-decorators"),
      {
        // decoratorsBeforeExport property is not allowed when version is legacy
        ...pluginDecorators.version === "2018-09" ? {
          decoratorsBeforeExport: true
        } : {},
        ...pluginDecorators
      }
    ]);
  }
  (_config_plugins = config.plugins) === null || _config_plugins === void 0 ? void 0 : _config_plugins.push(
    // Stage 1
    // link: https://github.com/tc39/proposal-export-default-from
    require.resolve("@babel/plugin-proposal-export-default-from"),
    // Stage 1
    // link: https://github.com/tc39/proposal-partial-application
    require.resolve("@babel/plugin-proposal-partial-application"),
    // Stage 2
    // link: https://github.com/tc39/proposal-pipeline-operator
    [
      require.resolve("@babel/plugin-proposal-pipeline-operator"),
      {
        proposal: "minimal"
      }
    ]
  );
  return config;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateBaseConfig
});
