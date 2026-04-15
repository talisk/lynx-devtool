import { createAsyncInterruptWorkflow, createContext, createManager, createSyncParallelWorkflow, createWaterfall } from "@modern-js/plugin";
const RuntimeConfigContext = createContext({});
const useRuntimeConfigContext = () => RuntimeConfigContext.use().value;
const wrapRoot = createWaterfall();
const beforeRender = createAsyncInterruptWorkflow();
const pickContext = createWaterfall();
const modifyRuntimeConfig = createSyncParallelWorkflow();
const runtimeHooks = {
  beforeRender,
  wrapRoot,
  pickContext,
  modifyRuntimeConfig
};
const runtimePluginAPI = {
  useRuntimeConfigContext
};
const createRuntime = () => createManager(runtimeHooks, runtimePluginAPI);
const runtime = createRuntime();
export {
  RuntimeConfigContext,
  createRuntime,
  runtime,
  useRuntimeConfigContext
};
