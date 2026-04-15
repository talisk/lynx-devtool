import { createAsyncInterruptWorkflow, createContext, createManager, createSyncParallelWorkflow, createWaterfall } from "@modern-js/plugin";
var RuntimeConfigContext = createContext({});
var useRuntimeConfigContext = function() {
  return RuntimeConfigContext.use().value;
};
var wrapRoot = createWaterfall();
var beforeRender = createAsyncInterruptWorkflow();
var pickContext = createWaterfall();
var modifyRuntimeConfig = createSyncParallelWorkflow();
var runtimeHooks = {
  beforeRender,
  wrapRoot,
  pickContext,
  modifyRuntimeConfig
};
var runtimePluginAPI = {
  useRuntimeConfigContext
};
var createRuntime = function() {
  return createManager(runtimeHooks, runtimePluginAPI);
};
var runtime = createRuntime();
export {
  RuntimeConfigContext,
  createRuntime,
  runtime,
  useRuntimeConfigContext
};
