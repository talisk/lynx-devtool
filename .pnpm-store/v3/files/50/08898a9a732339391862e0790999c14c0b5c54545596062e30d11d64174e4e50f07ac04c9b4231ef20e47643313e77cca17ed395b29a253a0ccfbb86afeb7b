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
var sync_exports = {};
__export(sync_exports, {
  DEFAULT_OPTIONS: () => DEFAULT_OPTIONS,
  cloneHook: () => cloneHook,
  cloneHooksMap: () => cloneHooksMap,
  createManager: () => createManager,
  generateRunner: () => generateRunner
});
module.exports = __toCommonJS(sync_exports);
var import_farrow_pipeline = require("../farrow-pipeline");
var import_waterfall = require("../waterfall");
var import_workflow = require("../workflow");
var import_shared = require("./shared");
const SYNC_PLUGIN_SYMBOL = "SYNC_PLUGIN_SYMBOL";
const DEFAULT_OPTIONS = {
  name: "untitled",
  pre: [],
  post: [],
  rivals: [],
  required: [],
  usePlugins: [],
  registerHook: {}
};
const createManager = (hooks, api) => {
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
  const isPlugin = (input) => (0, import_shared.isObject)(input) && (0, import_shared.hasOwnProperty)(input, SYNC_PLUGIN_SYMBOL) && input[SYNC_PLUGIN_SYMBOL] === SYNC_PLUGIN_SYMBOL;
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
        ...DEFAULT_OPTIONS,
        name: `No.${index++} plugin`,
        ...options,
        SYNC_PLUGIN_SYMBOL,
        setup
      };
    };
    const clear = () => {
      plugins = [];
    };
    const init = () => {
      const sortedPlugins = (0, import_shared.sortPlugins)(plugins);
      const mergedPluginAPI = {
        ...pluginAPI,
        ...overrideAPI
      };
      (0, import_shared.checkPlugins)(sortedPlugins);
      const hooksList = sortedPlugins.map((plugin) => plugin.setup(mergedPluginAPI));
      runners = generateRunner(hooksList, currentHooks);
      return runners;
    };
    const run = (cb) => cb();
    const manager = {
      createPlugin,
      isPlugin,
      usePlugin,
      init,
      clear,
      run,
      registerHook,
      useRunner,
      clone
    };
    return manager;
  };
  return clone();
};
const generateRunner = (hooksList, hooksMap) => {
  const runner = {};
  const cloneShape = cloneHooksMap(hooksMap);
  if (hooksMap) {
    for (const key in cloneShape) {
      hooksList.forEach((hooks) => {
        if (hooks === null || hooks === void 0 ? void 0 : hooks[key]) {
          cloneShape[key].use(hooks[key]);
        }
      });
      runner[key] = (input, options) => cloneShape[key].run(input, {
        ...options
      });
    }
  }
  return runner;
};
const cloneHook = (hook) => {
  if ((0, import_waterfall.isWaterfall)(hook)) {
    return (0, import_waterfall.createWaterfall)();
  }
  if ((0, import_waterfall.isAsyncWaterfall)(hook)) {
    return (0, import_waterfall.createAsyncWaterfall)();
  }
  if ((0, import_workflow.isWorkflow)(hook)) {
    return (0, import_workflow.createWorkflow)();
  }
  if ((0, import_workflow.isAsyncWorkflow)(hook)) {
    return (0, import_workflow.createAsyncWorkflow)();
  }
  if ((0, import_workflow.isParallelWorkflow)(hook)) {
    return (0, import_workflow.createParallelWorkflow)();
  }
  if ((0, import_workflow.isAsyncInterruptWorkflow)(hook)) {
    return (0, import_workflow.createAsyncInterruptWorkflow)();
  }
  if ((0, import_workflow.isSyncParallelWorkflow)(hook)) {
    return (0, import_workflow.createSyncParallelWorkflow)();
  }
  if ((0, import_farrow_pipeline.isPipeline)(hook)) {
    return (0, import_farrow_pipeline.createPipeline)();
  }
  throw new Error(`Unknown hook: ${hook}`);
};
const cloneHooksMap = (record) => {
  if (!record) {
    return record;
  }
  const result = {};
  for (const key in record) {
    result[key] = cloneHook(record[key]);
  }
  return result;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DEFAULT_OPTIONS,
  cloneHook,
  cloneHooksMap,
  createManager,
  generateRunner
});
