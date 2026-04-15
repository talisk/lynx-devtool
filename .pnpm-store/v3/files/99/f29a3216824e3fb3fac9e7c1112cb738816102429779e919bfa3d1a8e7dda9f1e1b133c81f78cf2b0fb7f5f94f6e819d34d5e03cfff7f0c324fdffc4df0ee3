"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "createUseModel", {
  enumerable: true,
  get: () => createUseModel
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _mountModel = /* @__PURE__ */ _interop_require_default._(require("./mountModel"));
const _subscribe = require("./subscribe");
const _misc = require("../utils/misc");
function createUseModel(context) {
  function useModel(...args) {
    const flattenedArgs = Array.isArray(args[0]) ? [
      ...args[0],
      ...args.slice(1)
    ] : args;
    flattenedArgs.forEach((model) => {
      if ((0, _misc.isModel)(model)) {
        (0, _mountModel.default)(context, model);
      }
    });
    const { getState, getActions, actualModels, subscribe } = parseModelParams(context, flattenedArgs);
    const computedArr = actualModels.map((m) => {
      const { modelDesc: { computed } } = context.apis.getModel(m);
      return computed;
    });
    const computedDepModels = (0, _misc.getComputedDepModels)(computedArr);
    computedDepModels.forEach((model) => {
      if ((0, _misc.isModel)(model)) {
        (0, _mountModel.default)(context, model);
      }
    });
    let [state, actions] = [
      getState(),
      getActions()
    ];
    ({ state, actions } = context.pluginCore.invokePipeline("useModel", {
      state,
      actions
    }, {
      models: actualModels,
      mountedModels: actualModels.map((model) => context.apis.getModel(model))
    }));
    return [
      state,
      actions,
      subscribe
    ];
  }
  return useModel;
}
const parseModelParams = (context, _models) => {
  const models = Array.isArray(_models) ? _models : [
    _models
  ];
  const actualModels = [];
  const selectors = [];
  for (const model of models) {
    if ((0, _misc.isModel)(model)) {
      actualModels.push(model);
    } else {
      selectors.push(model);
    }
  }
  const [stateSelector, actionSelector] = selectors;
  if (actualModels.length > 1) {
    actualModels.forEach((m) => {
      if (Object.prototype.toString.call(context.apis.getModel(m).state) !== "[object Object]") {
        throw new Error(`You cant use multiple model one of which's state is primitive data`);
      }
    });
  }
  const getStateWithComputed = (model) => {
    const { state, modelDesc: { computed } } = context.apis.getModel(model);
    let computedState;
    if (computed) {
      computedState = Object.keys(computed).reduce((curState, computedKey) => {
        curState[computedKey] = state[computedKey];
        return curState;
      }, {});
      return {
        ...state,
        ...computedState
      };
    }
    return state;
  };
  const finalStateSelector = (...models2) => {
    if (stateSelector) {
      return stateSelector(...actualModels.map((model) => getStateWithComputed(model)));
    }
    if (models2.length === 1) {
      return getStateWithComputed(models2[0]);
    }
    return models2.reduce((res, model) => ({
      ...res,
      ...getStateWithComputed(model)
    }), {});
  };
  const finalActionSelector = actionSelector || ((...actions) => actions.reduce((res, action) => Object.assign(res, action), {}));
  return {
    getState: () => finalStateSelector(...actualModels),
    getActions: () => finalActionSelector(...actualModels.map((model) => context.apis.getModel(model).actions)),
    subscribe: (handler) => (0, _subscribe.combineSubscribe)(context, ...actualModels.map((model) => context.apis.getModelSubscribe(model)))(handler),
    actualModels
  };
};
