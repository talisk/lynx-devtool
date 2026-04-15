import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from "@modern-js-reduck/react";
import { createStore } from "@modern-js-reduck/store";
import { merge } from "@modern-js/runtime-utils/merge";
import { useContext } from "react";
import { isBrowser } from "../../common";
import { RuntimeReactContext } from "../../core";
import { autoActions, devtools, effects, immer } from "../plugins";
const StatePluginHandleMap = {
  immer,
  effects,
  autoActions,
  devtools
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
          const context = useContext(RuntimeReactContext);
          return /* @__PURE__ */ _jsx(Provider, {
            store: context.store,
            config: storeConfig,
            children: /* @__PURE__ */ _jsx(App, {
              ...props
            })
          });
        };
        return getStateApp;
      },
      beforeRender(context) {
        const pluginConfig = api.useRuntimeConfigContext();
        const config = merge(pluginConfig.state || {}, userConfig);
        storeConfig = getStoreConfig(config);
        if (isBrowser()) {
          var _window__SSR_DATA_data, _window__SSR_DATA, _window;
          storeConfig.initialState = storeConfig.initialState || ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : (_window__SSR_DATA_data = _window__SSR_DATA.data) === null || _window__SSR_DATA_data === void 0 ? void 0 : _window__SSR_DATA_data.storeState) || {};
        }
        context.store = createStore(storeConfig);
      }
    };
  }
});
var plugin_default = statePlugin;
export * from "../plugins";
export {
  plugin_default as default,
  statePlugin
};
