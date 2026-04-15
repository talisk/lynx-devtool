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
var async_exports = {};
__export(async_exports, {
  createAsyncManager: () => createAsyncManager
});
module.exports = __toCommonJS(async_exports);
var import_shared = require("./shared");
var import_sync = require("./sync");
const ASYNC_PLUGIN_SYMBOL = "ASYNC_PLUGIN_SYMBOL";
const createAsyncManager = (hooks, api) => {
  let index = 0;
  let runners;
  let currentHooks = {
    ...hooks
  };
  const useRunner = () => runners;
  const registerHook = (extraHooks) => {
    currentHooks = {
      ...extraHooks,
      ...currentHooks
    };
  };
  const isPlugin = (input) => (0, import_shared.isObject)(input) && (0, import_shared.hasOwnProperty)(input, ASYNC_PLUGIN_SYMBOL) && input[ASYNC_PLUGIN_SYMBOL] === ASYNC_PLUGIN_SYMBOL;
  const pluginAPI = {
    ...api,
    useHookRunners: useRunner
  };
  const clone = (overrideAPI) => {
    let plugins = [];
    const addPlugin = (plugin) => {
      if (!(0, import_shared.includePlugin)(plugins, plugin)) {
        plugins.push({
          ...plugin
        });
      }
    };
    const usePlugin = (...input) => {
      input.forEach((plugin) => {
        if (isPlugin(plugin)) {
          addPlugin(plugin);
        } else if (typeof plugin === "function") {
          const options = plugin();
          addPlugin(createPlugin(options.setup, options));
        } else if ((0, import_shared.isObject)(plugin)) {
          addPlugin(createPlugin(plugin.setup, plugin));
        } else if (process.env.NODE_ENV !== "production") {
          console.warn(`Unknown plugin: ${JSON.stringify(plugin)}`);
        }
      });
      return manager;
    };
    const createPlugin = (setup = () => {
    }, options = {}) => {
      var _options_usePlugins;
      if ((_options_usePlugins = options.usePlugins) === null || _options_usePlugins === void 0 ? void 0 : _options_usePlugins.length) {
        options.usePlugins.forEach((plugin) => {
          usePlugin(createPlugin(plugin.setup, plugin));
        });
      }
      if (options.registerHook) {
        registerHook(options.registerHook);
      }
      return {
        ...import_sync.DEFAULT_OPTIONS,
        name: `No.${index++} plugin`,
        ...options,
        ASYNC_PLUGIN_SYMBOL,
        setup
      };
    };
    const clear = () => {
      plugins = [];
    };
    const init = async () => {
      const sortedPlugins = (0, import_shared.sortPlugins)(plugins);
      const mergedPluginAPI = {
        ...pluginAPI,
        ...overrideAPI
      };
      (0, import_shared.checkPlugins)(sortedPlugins);
      const hooksList = [];
      for (const plugin of sortedPlugins) {
        hooksList.push(await plugin.setup(mergedPluginAPI));
      }
      runners = (0, import_sync.generateRunner)(hooksList, currentHooks);
      return runners;
    };
    const run = (cb) => cb();
    const manager = {
      createPlugin,
      isPlugin,
      usePlugin,
      init,
      run,
      clear,
      clone,
      registerHook,
      useRunner
    };
    return manager;
  };
  return clone();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createAsyncManager
});
