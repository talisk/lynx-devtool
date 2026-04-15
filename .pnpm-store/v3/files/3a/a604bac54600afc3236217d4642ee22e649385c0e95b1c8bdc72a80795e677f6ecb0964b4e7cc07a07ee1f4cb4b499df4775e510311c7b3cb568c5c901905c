import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { memorize } from "../utils/memoize";
import { getComputedDepModels, getModelInitializer, getStateType, isModel, StateType } from "../utils/misc";
const mountModel = (context, model) => {
  if (context.apis.getModel(model)) {
    return;
  }
  const { onMount, trigger: triggerOnMount } = createOnMount();
  let modelDesc = getModelInitializer(model)(context, {
    use: context.apis.useModel,
    onMount
  });
  modelDesc.name = model._name;
  modelDesc = context.pluginCore.invokePipeline("prepareModelDesc", modelDesc);
  if (!checkModel(context, modelDesc)) {
    return;
  }
  context.apis.mountingModel(model._name);
  const flattenedActions = flattenActions(modelDesc);
  const reducer = createReducer(context, flattenedActions, modelDesc.state, modelDesc.computed);
  if (reducer) {
    context.apis.addReducers({
      [modelDesc.name]: reducer
    });
  }
  const [dispatchActions, setDispatchAction] = createDispatchActions(context, modelDesc);
  let mountedModel = {
    actions: dispatchActions,
    state: modelDesc.state,
    name: modelDesc.name,
    modelDesc
  };
  ({ mountedModel } = context.pluginCore.invokePipeline("modelMount", {
    modelDesc,
    mountedModel
  }, {
    setDispatchAction
  }));
  context.apis.addModel(model, mountedModel);
  triggerOnMount();
};
const checkModel = (context, modelDesc) => {
  if (!modelDesc.name || typeof modelDesc.name !== "string") {
    console.error(`model name expected is a valid string, but got ${modelDesc.name}`);
    return false;
  }
  return true;
};
const generateComputedDescriptors = (computed = {}, useModel) => {
  return Object.keys(computed).reduce((prev, name) => {
    const selector = generateComputedSelector(name, computed[name], useModel);
    prev[name] = {
      get() {
        return selector(this);
      },
      // MARK: not enumerable, avoid to get computed properties through rest(...) syntax. eg., reducer {...state}
      enumerable: false,
      configurable: true
    };
    return prev;
  }, {});
};
const createReducer = (context, flattenedActions, initialState, computed) => {
  if (!flattenedActions) {
    return null;
  }
  let computedDescriptors = computed && generateComputedDescriptors(computed, context.apis.useModel);
  const depModels = getComputedDepModels(computed);
  const isDepModelAction = (actionType) => {
    return depModels.some((model) => actionType.split("/")[0] === model._name.toUpperCase());
  };
  return (state = initialState, reduxAction) => {
    const actionType = reduxAction.type;
    const reducer = flattenedActions[actionType];
    let newState = state;
    if (isDepModelAction(actionType)) {
      newState = _object_spread({}, state);
      computedDescriptors = computed && generateComputedDescriptors(computed, context.apis.useModel);
    }
    if (reducer) {
      newState = context.pluginCore.invokePipeline("beforeReducer", flattenedActions[reduxAction.type], {
        name: reduxAction.type,
        computedDescriptors
      })(state, reduxAction.payload, ...reduxAction.extraArgs || []);
    }
    if (computedDescriptors && getStateType(newState) !== StateType.Object) {
      throw Error(`Only object type state can have computed properties.`);
    }
    return computedDescriptors ? Object.defineProperties(newState, computedDescriptors) : newState;
  };
};
const generateComputedSelector = (name, computed, useModel) => {
  let selector;
  let depModels;
  const _selector = (fn, ...args) => {
    const result = fn(...args);
    if (typeof result === "function") {
      return memorize((...args2) => {
        return result(...args2);
      });
    } else {
      return result;
    }
  };
  if (typeof computed === "function") {
    selector = (state) => {
      return _selector(computed, state);
    };
  } else if (Array.isArray(computed)) {
    depModels = computed.slice(0, -1);
    const userSelector = computed.slice(-1)[0];
    if (!depModels.every((m) => isModel(m)) || typeof userSelector !== "function") {
      throw new Error(`The types of computed property parameters are not correct. Computed property name: ${name}`);
    }
    selector = (state) => {
      return _selector(userSelector, state, ...depModels.map((model) => useModel(model)[0]));
    };
  }
  return memorize(selector);
};
const flattenActions = (modelDesc) => {
  const flattenedActions = {};
  forEachAction(modelDesc, (path, action) => {
    flattenedActions[path.join("/").toUpperCase()] = action;
  });
  return flattenedActions;
};
const createDispatchActions = (context, modelDesc) => {
  const dispatchActions = {};
  const set = (path, value) => {
    let cur = dispatchActions;
    const len = path.length;
    for (let i = 1; i < len - 1; i++) {
      if (!cur[path[i]]) {
        cur[path[i]] = {};
      }
      cur = cur[path[i]];
    }
    if (!cur[path[len - 1]]) {
      cur[path[len - 1]] = value;
    } else {
      cur[path[len - 1]] = Object.assign(value, cur[path[len - 1]]);
    }
  };
  forEachAction(modelDesc, (path) => set(path, (payload, ...extraArgs) => {
    return context.store.dispatch({
      type: path.join("/").toUpperCase(),
      payload,
      extraArgs
    });
  }));
  return [
    dispatchActions,
    set
  ];
};
const forEachAction = (modelDesc, callback) => {
  const path = [
    modelDesc.name
  ];
  const traverse = (action) => {
    if (!action) {
      return null;
    }
    if (typeof action === "function") {
      return callback(path.slice(), action);
    }
    Object.keys(action).forEach((key) => {
      path.push(key);
      traverse(action[key]);
      path.pop();
    });
    return null;
  };
  traverse(modelDesc.actions || {});
};
const createOnMount = () => {
  const handlers = [];
  const triggered = false;
  const onMount = (handler) => {
    handlers.push(handler);
  };
  const trigger = () => {
    if (triggered) {
      return;
    }
    handlers.forEach((handler) => handler());
  };
  return {
    onMount,
    trigger
  };
};
export default mountModel;
