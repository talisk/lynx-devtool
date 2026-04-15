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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var plugin_exports = {};
__export(plugin_exports, {
  default: () => plugin_default,
  statePlugin: () => statePlugin
});
module.exports = __toCommonJS(plugin_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("@modern-js-reduck/react");
var import_store = require("@modern-js-reduck/store");
var import_merge = require("@modern-js/runtime-utils/merge");
var import_react2 = require("react");
var import_common = require("../../common");
var import_core = require("../../core");
var import_plugins = require("../plugins");
__reExport(plugin_exports, require("../plugins"), module.exports);
const StatePluginHandleMap = {
  immer: import_plugins.immer,
  effects: import_plugins.effects,
  autoActions: import_plugins.autoActions,
  devtools: import_plugins.devtools
};
const getStoreConfig = (config) => {
  const internalPlugins = [
    "immer",
    "effects",
    "autoActions",
    "devtools"
  ];
  const plugins = [];
  internalPlugins.filter((plugin) => config[plugin] !== false).forEach((plugin) => plugins.push(StatePluginHandleMap[plugin](config[plugin])));
  const storeConfig = {};
  for (const [key, value] of Object.entries(config)) {
    if (!internalPlugins.includes(key)) {
      storeConfig[key] = value;
    }
  }
  storeConfig.plugins = plugins;
  return storeConfig;
};
const statePlugin = (userConfig = {}) => ({
  name: "@modern-js/plugin-state",
  setup: (api) => {
    let storeConfig;
    return {
      wrapRoot(App) {
        const getStateApp = (props) => {
          const context = (0, import_react2.useContext)(import_core.RuntimeReactContext);
          return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Provider, {
            store: context.store,
            config: storeConfig,
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(App, {
              ...props
            })
          });
        };
        return getStateApp;
      },
      beforeRender(context) {
        const pluginConfig = api.useRuntimeConfigContext();
        const config = (0, import_merge.merge)(pluginConfig.state || {}, userConfig);
        storeConfig = getStoreConfig(config);
        if ((0, import_common.isBrowser)()) {
          var _window__SSR_DATA_data, _window__SSR_DATA, _window;
          storeConfig.initialState = storeConfig.initialState || ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : (_window__SSR_DATA_data = _window__SSR_DATA.data) === null || _window__SSR_DATA_data === void 0 ? void 0 : _window__SSR_DATA_data.storeState) || {};
        }
        context.store = (0, import_store.createStore)(storeConfig);
      }
    };
  }
});
var plugin_default = statePlugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  statePlugin,
  ...require("../plugins")
});
