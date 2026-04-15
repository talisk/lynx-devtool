import { merge } from "@modern-js/runtime-utils/merge";
import { RuntimeConfigContext, runtime } from "./base";
import { getGlobalRunner, setGlobalRunner } from "./runner";
export * from "./base";
function setupConfigContext() {
  const runner = getGlobalRunner();
  const configs = runner.modifyRuntimeConfig();
  RuntimeConfigContext.set(merge({}, ...configs));
}
function registerPlugin(internalPlugins, runtimeConfig, customRuntime) {
  const { plugins = [] } = runtimeConfig || {};
  (customRuntime || runtime).usePlugin(...internalPlugins, ...plugins);
  const runner = (customRuntime || runtime).init();
  setGlobalRunner(runner);
  setupConfigContext();
  return runner;
}
function mergeConfig(config, ...otherConfig) {
  return merge({}, config, ...otherConfig);
}
export {
  mergeConfig,
  registerPlugin
};
