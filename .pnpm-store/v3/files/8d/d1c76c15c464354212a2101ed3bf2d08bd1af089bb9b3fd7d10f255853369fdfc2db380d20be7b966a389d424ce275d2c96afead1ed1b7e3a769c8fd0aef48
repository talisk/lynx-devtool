export const initializerSymbol = Symbol.for("__reduck_model_initializer__");
export const getModelInitializer = (_model) => _model[initializerSymbol];
export const isModel = (_model) => _model && Boolean(getModelInitializer(_model));
export const getComputedDepModels = (computed) => {
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
export var StateType;
(function(StateType2) {
  StateType2["Primitive"] = "primitive";
  StateType2["Array"] = "array";
  StateType2["Object"] = "object";
})(StateType || (StateType = {}));
export const getStateType = (value) => {
  if (Array.isArray(value)) {
    return StateType.Array;
  } else if (typeof value === "object" && value != "undefined") {
    return StateType.Object;
  } else {
    return StateType.Primitive;
  }
};
