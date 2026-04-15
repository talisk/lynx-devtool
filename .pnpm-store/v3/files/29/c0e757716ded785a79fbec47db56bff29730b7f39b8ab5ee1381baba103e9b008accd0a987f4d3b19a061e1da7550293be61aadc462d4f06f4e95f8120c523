import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { merge } from "@modern-js/runtime-utils/merge";
import { RuntimeConfigContext, runtime } from "./base";
import { getGlobalRunner, setGlobalRunner } from "./runner";
export * from "./base";
function setupConfigContext() {
  var runner = getGlobalRunner();
  var configs = runner.modifyRuntimeConfig();
  RuntimeConfigContext.set(merge.apply(void 0, [
    {}
  ].concat(_to_consumable_array(configs))));
}
function registerPlugin(internalPlugins, runtimeConfig, customRuntime) {
  var _instance;
  var _ref = runtimeConfig || {}, _ref_plugins = _ref.plugins, plugins = _ref_plugins === void 0 ? [] : _ref_plugins;
  (_instance = customRuntime || runtime).usePlugin.apply(_instance, _to_consumable_array(internalPlugins).concat(_to_consumable_array(plugins)));
  var runner = (customRuntime || runtime).init();
  setGlobalRunner(runner);
  setupConfigContext();
  return runner;
}
function mergeConfig(config) {
  for (var _len = arguments.length, otherConfig = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    otherConfig[_key - 1] = arguments[_key];
  }
  return merge.apply(void 0, [
    {},
    config
  ].concat(_to_consumable_array(otherConfig)));
}
export {
  mergeConfig,
  registerPlugin
};
