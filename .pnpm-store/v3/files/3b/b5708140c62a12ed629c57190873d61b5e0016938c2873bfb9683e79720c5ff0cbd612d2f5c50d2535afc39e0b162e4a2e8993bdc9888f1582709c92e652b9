"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: () => _default
});
const _redux = require("redux");
const _context = require("./context");
const createStore = (props = {}) => {
  var _props_plugins;
  const store = {};
  const context = (0, _context.createContext)(store);
  props === null || props === void 0 ? void 0 : (_props_plugins = props.plugins) === null || _props_plugins === void 0 ? void 0 : _props_plugins.forEach((plugin) => context.pluginCore.usePlugin(plugin));
  const finalProps = context.pluginCore.invokePipeline("config", props);
  const { initialState = {}, middlewares, enhancers = [], models = [] } = finalProps;
  Object.assign(store, (0, _redux.createStore)((state) => state, initialState, (0, _redux.compose)(...[
    mergeInitialState(),
    middlewares ? (0, _redux.applyMiddleware)(...middlewares) : void 0,
    ...enhancers || []
  ].filter(Boolean))));
  store.use = context.apis.useModel;
  store.unmount = context.apis.unmountModel;
  if (models.length > 0) {
    store.use(models);
  }
  context.pluginCore.invokeWaterFall("afterCreateStore", store);
  return store;
};
function mergeInitialState() {
  return (createStore2) => (reducer, initialState) => {
    const liftReducer = (r) => {
      if (typeof r !== "function") {
        throw new Error("Expected the reducer to be a function.");
      }
      return (state = initialState, action) => {
        const nextState = r(state, action);
        if (/^@@redux\/REPLACE/.test(action.type)) {
          return {
            ...state,
            ...nextState
          };
        } else {
          return nextState;
        }
      };
    };
    const store = createStore2(liftReducer(reducer));
    return {
      ...store,
      replaceReducer: (reducer2) => {
        return store.replaceReducer(liftReducer(reducer2));
      }
    };
  };
}
const _default = createStore;
