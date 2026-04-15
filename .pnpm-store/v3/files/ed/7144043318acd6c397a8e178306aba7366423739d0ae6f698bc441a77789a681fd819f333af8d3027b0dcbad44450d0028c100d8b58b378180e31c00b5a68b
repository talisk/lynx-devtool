import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { applyMiddleware, compose, createStore as createReduxStore } from "redux";
import { createContext } from "./context";
const createStore = (props = {}) => {
  var _props_plugins;
  const store = {};
  const context = createContext(store);
  props === null || props === void 0 ? void 0 : (_props_plugins = props.plugins) === null || _props_plugins === void 0 ? void 0 : _props_plugins.forEach((plugin) => context.pluginCore.usePlugin(plugin));
  const finalProps = context.pluginCore.invokePipeline("config", props);
  const { initialState = {}, middlewares, enhancers = [], models = [] } = finalProps;
  Object.assign(store, createReduxStore((state) => state, initialState, compose(...[
    mergeInitialState(),
    middlewares ? applyMiddleware(...middlewares) : void 0,
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
          return _object_spread({}, state, nextState);
        } else {
          return nextState;
        }
      };
    };
    const store = createStore2(liftReducer(reducer));
    return _object_spread_props(_object_spread({}, store), {
      replaceReducer: (reducer2) => {
        return store.replaceReducer(liftReducer(reducer2));
      }
    });
  };
}
export default createStore;
