import {
  checkPlugins,
  hasOwnProperty,
  includePlugin,
  isObject,
  sortPlugins
} from "./shared";
import { DEFAULT_OPTIONS, generateRunner } from "./sync";
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
  const isPlugin = (input) => isObject(input) && hasOwnProperty(input, ASYNC_PLUGIN_SYMBOL) && input[ASYNC_PLUGIN_SYMBOL] === ASYNC_PLUGIN_SYMBOL;
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
        ASYNC_PLUGIN_SYMBOL,
        setup
      };
    };
    const clear = () => {
      plugins = [];
    };
    const init = async () => {
      const sortedPlugins = sortPlugins(plugins);
      const mergedPluginAPI = {
        ...pluginAPI,
        ...overrideAPI
      };
      checkPlugins(sortedPlugins);
      const hooksList = [];
      for (const plugin of sortedPlugins) {
        hooksList.push(await plugin.setup(mergedPluginAPI));
      }
      runners = generateRunner(hooksList, currentHooks);
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
export {
  createAsyncManager
};
