import { createPipeline, isPipeline } from "../farrow-pipeline";
import { createAsyncWaterfall, createWaterfall, isAsyncWaterfall, isWaterfall } from "../waterfall";
import { createAsyncInterruptWorkflow, createAsyncWorkflow, createParallelWorkflow, createSyncParallelWorkflow, createWorkflow, isAsyncInterruptWorkflow, isAsyncWorkflow, isParallelWorkflow, isSyncParallelWorkflow, isWorkflow } from "../workflow";
import {
  checkPlugins,
  hasOwnProperty,
  includePlugin,
  isObject,
  sortPlugins
} from "./shared";
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
  const isPlugin = (input) => isObject(input) && hasOwnProperty(input, SYNC_PLUGIN_SYMBOL) && input[SYNC_PLUGIN_SYMBOL] === SYNC_PLUGIN_SYMBOL;
  const pluginAPI = {
    ...api,
    useHookRunners: useRunner
  };
  const clone = (overrideAPI) => {
    let plugins = [];
    const addPlugin = (plugin) => {
      if (!includePlugin(plugins, plugin)) {
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
        } else if (isObject(plugin)) {
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
      const sortedPlugins = sortPlugins(plugins);
      const mergedPluginAPI = {
        ...pluginAPI,
        ...overrideAPI
      };
      checkPlugins(sortedPlugins);
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
  if (isWaterfall(hook)) {
    return createWaterfall();
  }
  if (isAsyncWaterfall(hook)) {
    return createAsyncWaterfall();
  }
  if (isWorkflow(hook)) {
    return createWorkflow();
  }
  if (isAsyncWorkflow(hook)) {
    return createAsyncWorkflow();
  }
  if (isParallelWorkflow(hook)) {
    return createParallelWorkflow();
  }
  if (isAsyncInterruptWorkflow(hook)) {
    return createAsyncInterruptWorkflow();
  }
  if (isSyncParallelWorkflow(hook)) {
    return createSyncParallelWorkflow();
  }
  if (isPipeline(hook)) {
    return createPipeline();
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
export {
  DEFAULT_OPTIONS,
  cloneHook,
  cloneHooksMap,
  createManager,
  generateRunner
};
