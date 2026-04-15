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
var react_exports = {};
__export(react_exports, {
  pluginReact: () => pluginReact
});
module.exports = __toCommonJS(react_exports);
const pluginReact = () => ({
  name: "uni-builder:react",
  pre: [
    "uni-builder:babel"
  ],
  setup(api) {
    api.modifyBundlerChain(async (chain, utils) => {
      const { config } = utils.environment;
      const usingHMR = !utils.isProd && config.dev.hmr && utils.target === "web";
      if (!usingHMR) {
        return;
      }
      const { CHAIN_ID } = utils;
      const { default: ReactFastRefreshPlugin } = await Promise.resolve().then(() => __toESM(require("@pmmmwh/react-refresh-webpack-plugin")));
      [
        CHAIN_ID.RULE.TS,
        CHAIN_ID.RULE.JS
      ].forEach((ruleId) => {
        if (!chain.module.rules.get(ruleId)) {
          return;
        }
        const rule = chain.module.rule(ruleId);
        if (!rule.uses.get(CHAIN_ID.USE.BABEL)) {
          return;
        }
        rule.use(CHAIN_ID.USE.BABEL).tap((options) => ({
          ...options,
          plugins: [
            ...options.plugins || [],
            [
              require.resolve("react-refresh/babel"),
              {
                skipEnvCheck: true
              }
            ]
          ]
        }));
      });
      chain.plugin(CHAIN_ID.PLUGIN.REACT_FAST_REFRESH).use(ReactFastRefreshPlugin, [
        {
          overlay: false,
          exclude: [
            /node_modules/
          ]
        }
      ]);
    });
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  pluginReact
});
