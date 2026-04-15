"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createPluginCore", {
  enumerable: true,
  get: () => createPluginCore
});
const createPluginCore = (pluginContext) => {
  const lifeCycleList = [];
  const findHandlers = (stage) => lifeCycleList.map((liftCycle) => liftCycle[stage]).filter(Boolean);
  return {
    usePlugin: (plugin) => {
      lifeCycleList.push(plugin(pluginContext));
    },
    invokePipeline: (stage, bypassParams, ...args) => {
      const handlers = findHandlers(stage);
      let params = bypassParams;
      for (const handler of handlers) {
        params = handler(params, ...args);
      }
      return params;
    },
    invokeWaterFall: (stage, ...args) => {
      const handlers = findHandlers(stage);
      return handlers.forEach((handler) => handler(...args));
    }
  };
};
