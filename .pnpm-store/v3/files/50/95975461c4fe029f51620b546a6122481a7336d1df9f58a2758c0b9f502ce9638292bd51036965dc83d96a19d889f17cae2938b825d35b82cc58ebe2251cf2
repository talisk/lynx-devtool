import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { jsx as _jsx } from "react/jsx-runtime";
import { Provider } from "@modern-js-reduck/react";
import { createStore } from "@modern-js-reduck/store";
import { merge } from "@modern-js/runtime-utils/merge";
import { useContext } from "react";
import { isBrowser } from "../../common";
import { RuntimeReactContext } from "../../core";
import { autoActions, devtools, effects, immer } from "../plugins";
var StatePluginHandleMap = {
  immer,
  effects,
  autoActions,
  devtools
};
var getStoreConfig = function(config) {
  var internalPlugins = [
    "immer",
    "effects",
    "autoActions",
    "devtools"
  ];
  var plugins = [];
  internalPlugins.filter(function(plugin) {
    return config[plugin] !== false;
  }).forEach(function(plugin) {
    return plugins.push(StatePluginHandleMap[plugin](config[plugin]));
  });
  var storeConfig = {};
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = Object.entries(config)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], value = _step_value[1];
      if (!internalPlugins.includes(key)) {
        storeConfig[key] = value;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  storeConfig.plugins = plugins;
  return storeConfig;
};
var statePlugin = function() {
  var userConfig = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return {
    name: "@modern-js/plugin-state",
    setup: function(api) {
      var storeConfig;
      return {
        wrapRoot: function wrapRoot(App) {
          var getStateApp = function(props) {
            var context = useContext(RuntimeReactContext);
            return /* @__PURE__ */ _jsx(Provider, {
              store: context.store,
              config: storeConfig,
              children: /* @__PURE__ */ _jsx(App, _object_spread({}, props))
            });
          };
          return getStateApp;
        },
        beforeRender: function beforeRender(context) {
          var pluginConfig = api.useRuntimeConfigContext();
          var config = merge(pluginConfig.state || {}, userConfig);
          storeConfig = getStoreConfig(config);
          if (isBrowser()) {
            var _window__SSR_DATA_data, _window__SSR_DATA, _window;
            storeConfig.initialState = storeConfig.initialState || ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : (_window__SSR_DATA_data = _window__SSR_DATA.data) === null || _window__SSR_DATA_data === void 0 ? void 0 : _window__SSR_DATA_data.storeState) || {};
          }
          context.store = createStore(storeConfig);
        }
      };
    }
  };
};
var plugin_default = statePlugin;
export * from "../plugins";
export {
  plugin_default as default,
  statePlugin
};
