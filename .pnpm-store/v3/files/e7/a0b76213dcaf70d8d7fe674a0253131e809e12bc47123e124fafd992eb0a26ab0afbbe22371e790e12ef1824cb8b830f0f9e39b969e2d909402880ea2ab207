import { combineReducers } from "redux";
import { createUseModel } from "../model/useModel";
import { createPluginCore } from "../plugin";
import { createSubscribe, GetUnsubscribe } from "../model/subscribe";
const dummyReducer = "__REDUCK_DUMMY_REDUCER__";
const createContext = (store) => {
  const reducers = {};
  const mountedModels = /* @__PURE__ */ new Map();
  const subscriptions = /* @__PURE__ */ new Map();
  const mountingModelNames = /* @__PURE__ */ new Set();
  let lastState;
  const addReducers = (_reducers) => {
    if (!lastState) {
      store.subscribe(() => {
        lastState = store.getState();
      });
    }
    if (reducers[dummyReducer]) {
      delete reducers[dummyReducer];
    }
    Object.assign(reducers, _reducers);
    Object.keys(_reducers).forEach((key) => mountingModelNames.delete(key));
    store.replaceReducer(combineReducers(reducers));
  };
  const addModel = (model, mountedModel) => {
    mountedModels.set(model._name, mountedModel);
    subscriptions.set(model._name, createSubscribe(context, model));
  };
  const getModel = (model) => {
    const mountedModel = getModelByName(model._name);
    if (!mountedModel) {
      return null;
    }
    return {
      name: mountedModel.name,
      state: lastState[mountedModel.name],
      actions: mountedModel.actions,
      modelDesc: mountedModel.modelDesc
    };
  };
  const getModelByName = (name) => {
    let model = null;
    for (const [, mountedModel] of mountedModels) {
      if (mountedModel.name === name) {
        model = mountedModel;
        break;
      }
    }
    return model;
  };
  const getModelSubscribe = (model) => subscriptions.get(model._name);
  const mountingModel = (name) => {
    if (mountingModelNames.has(name)) {
      throw new Error(`You are mounting the model: ${name} which is already in mounting process`);
    }
    mountingModelNames.add(name);
  };
  const unmountModel = (model) => {
    var _subscription_GetUnsubscribe;
    if (!getModel(model)) {
      return;
    }
    const subscription = subscriptions.get(model._name);
    (_subscription_GetUnsubscribe = subscription[GetUnsubscribe]()) === null || _subscription_GetUnsubscribe === void 0 ? void 0 : _subscription_GetUnsubscribe();
    mountedModels.delete(model._name);
    subscriptions.delete(model._name);
    delete lastState[model._name];
    delete reducers[model._name];
    if (Object.keys(reducers).length === 0) {
      reducers[dummyReducer] = () => {
        return null;
      };
    }
    store.replaceReducer(combineReducers(reducers));
  };
  const pluginCore = createPluginCore({
    store
  });
  const context = {
    store,
    apis: {
      addReducers,
      addModel,
      getModel,
      getModelSubscribe,
      mountingModel,
      unmountModel
    },
    pluginCore
  };
  context.apis.useModel = createUseModel(context);
  return context;
};
export { createContext };
