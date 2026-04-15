import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef, memo } from "react";
import { utils } from "@modern-js-reduck/store";
import hoistNonReactStatics from "hoist-non-react-statics";
import { useModel } from "./hook";
export function connect(models, opt) {
  return (C) => withProxy(C, models, opt);
}
function withProxy(C, models, opt) {
  const actualModels = [];
  const selectors = [];
  const modelArr = Array.isArray(models) ? models : [
    models
  ];
  for (const model of modelArr) {
    if (utils.isModel(model)) {
      actualModels.push(model);
    } else {
      selectors.push(model);
    }
  }
  const config = {};
  if (opt && typeof opt === "object" && Object.keys(opt).length > 0) {
    Object.assign(config, opt);
  }
  const Wrapper = (props, ref) => {
    const [stateSelector, actionSelector] = selectors;
    let finalStateSelector;
    let finalActionSelector;
    if (stateSelector) {
      finalStateSelector = (..._args) => stateSelector(..._args, props);
    }
    if (actionSelector) {
      finalActionSelector = actionSelector && ((..._args) => actionSelector(..._args, props));
    }
    const [mapState, mapActions] = useModel([
      ...actualModels,
      // FIXME: any
      finalStateSelector,
      finalActionSelector
    ]);
    const data = _object_spread({}, mapState, mapActions, props);
    if (ref && config.forwardRef) {
      data.ref = ref;
    }
    return /* @__PURE__ */ _jsx(C, _object_spread({}, data));
  };
  Wrapper.displayName = `Connect(${C.displayName || C.name || "Anonymous"})}`;
  if (config.forwardRef) {
    const Forward = /* @__PURE__ */ forwardRef(Wrapper);
    const MemoForward = /* @__PURE__ */ memo(Forward);
    hoistNonReactStatics(MemoForward, C);
    return MemoForward;
  }
  const MemoWrapper = /* @__PURE__ */ memo(Wrapper);
  hoistNonReactStatics(MemoWrapper, C);
  return MemoWrapper;
}
