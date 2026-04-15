import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { createPlugin } from "@modern-js-reduck/store";
import { createPromise } from "redux-promise-middleware";
const isReduxPromiseFulfilled = (data) => {
  return typeof data === "object" && data.hasOwnProperty("action") && data.hasOwnProperty("value");
};
const isPromise = (value) => {
  if (value !== null && typeof value === "object") {
    return value && typeof value.then === "function";
  }
  return false;
};
const createDispatchActionsFromEffects = (store, name, effects, setDispatchAction) => {
  const path = [
    name
  ];
  const traverse = (_effects) => {
    if (typeof _effects === "function") {
      const type = path.join("/").toUpperCase();
      setDispatchAction(path.slice(), (...args) => {
        const value = _effects(...args);
        const dispatch = (payload) => store.dispatch({
          type,
          payload
        });
        if (isPromise(value) || typeof value === "function") {
          const res = dispatch(value);
          if (isPromise(res)) {
            return res.then((data) => isReduxPromiseFulfilled(data) ? data.value : data);
          }
          return res;
        }
        return value;
      });
    } else {
      Object.keys(_effects).forEach((key) => {
        path.push(key);
        traverse(_effects[key]);
        path.pop();
      });
    }
  };
  traverse(effects);
};
const plugin = createPlugin((context) => ({
  config(storeConfig) {
    return _object_spread_props(_object_spread({}, storeConfig), {
      middlewares: [
        createPromise({
          promiseTypeDelimiter: "/"
        }),
        // middlewares from config are at the end
        ...storeConfig.middlewares || []
      ]
    });
  },
  modelMount({ modelDesc, mountedModel }, { setDispatchAction }) {
    const { effects } = modelDesc;
    if (!effects) {
      return {
        modelDesc,
        mountedModel
      };
    }
    createDispatchActionsFromEffects(context.store, modelDesc.name, modelDesc.effects, setDispatchAction);
    return {
      modelDesc,
      mountedModel
    };
  }
}));
export default plugin;
