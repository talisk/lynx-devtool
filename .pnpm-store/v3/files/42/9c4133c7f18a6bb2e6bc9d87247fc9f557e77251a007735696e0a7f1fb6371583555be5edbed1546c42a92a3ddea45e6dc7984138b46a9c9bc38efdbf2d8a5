"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
function _export(target, all) {
  for (var name in all)
    Object.defineProperty(target, name, {
      enumerable: true,
      get: all[name]
    });
}
_export(exports, {
  GetUnsubscribe: () => GetUnsubscribe,
  createSubscribe: () => createSubscribe,
  combineSubscribe: () => combineSubscribe
});
const GetUnsubscribe = Symbol("getUnsubscribe");
const createSubscribe = (context, model) => {
  const mountedModel = context.apis.getModel(model);
  if (!mountedModel) {
    return null;
  }
  const { name } = mountedModel;
  let lastState = context.store.getState()[name];
  let unsubscribeStore;
  const handlers = /* @__PURE__ */ new Set();
  const setupSubscribeStore = () => {
    if (unsubscribeStore) {
      return unsubscribeStore;
    }
    unsubscribeStore = context.store.subscribe(() => {
      const curState = context.store.getState()[name];
      if (lastState !== curState) {
        lastState = curState;
        handlers.forEach((handler) => handler());
      }
    });
    return unsubscribeStore;
  };
  const ret = (handler) => {
    unsubscribeStore = setupSubscribeStore();
    handlers.add(handler);
    return () => {
      handlers.delete(handler);
      if (handlers.size === 0) {
        unsubscribeStore === null || unsubscribeStore === void 0 ? void 0 : unsubscribeStore();
        unsubscribeStore = null;
      }
    };
  };
  ret[GetUnsubscribe] = () => unsubscribeStore;
  return ret;
};
const combineSubscribe = (context, ...subscribes) => {
  const { store } = context;
  let changed = false;
  const handlers = /* @__PURE__ */ new Set();
  return (handler) => {
    handlers.add(handler);
    const disposer = [];
    subscribes.forEach((subscribe) => {
      disposer.push(subscribe(() => {
        changed = true;
      }));
    });
    const unsubscribeStore = store.subscribe(() => {
      if (changed) {
        changed = false;
        handlers.forEach((h) => h());
      }
    });
    return () => {
      unsubscribeStore();
      disposer.forEach((dispose) => dispose());
    };
  };
};
