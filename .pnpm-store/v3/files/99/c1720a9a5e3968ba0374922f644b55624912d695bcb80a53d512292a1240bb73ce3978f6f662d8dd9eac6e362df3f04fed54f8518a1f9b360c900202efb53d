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
  StateType: () => StateType,
  initializerSymbol: () => initializerSymbol,
  getModelInitializer: () => getModelInitializer,
  isModel: () => isModel,
  getComputedDepModels: () => getComputedDepModels,
  getStateType: () => getStateType
});
const initializerSymbol = Symbol.for("__reduck_model_initializer__");
const getModelInitializer = (_model) => _model[initializerSymbol];
const isModel = (_model) => _model && Boolean(getModelInitializer(_model));
const getComputedDepModels = (computed) => {
  const depModels = [];
  const computedArr = Array.isArray(computed) ? computed : [
    computed
  ];
  computedArr.forEach((_computed) => {
    computed && Object.keys(computed).forEach((key) => {
      const selector = computed[key];
      if (Array.isArray(selector)) {
        selector.forEach((s) => {
          if (!depModels.includes(s) && isModel(s)) {
            depModels.push(s);
          }
        });
      }
    });
  });
  return depModels;
};
var StateType;
(function(StateType2) {
  StateType2["Primitive"] = "primitive";
  StateType2["Array"] = "array";
  StateType2["Object"] = "object";
})(StateType || (StateType = {}));
const getStateType = (value) => {
  if (Array.isArray(value)) {
    return StateType.Array;
  } else if (typeof value === "object" && value != "undefined") {
    return StateType.Object;
  } else {
    return StateType.Primitive;
  }
};
