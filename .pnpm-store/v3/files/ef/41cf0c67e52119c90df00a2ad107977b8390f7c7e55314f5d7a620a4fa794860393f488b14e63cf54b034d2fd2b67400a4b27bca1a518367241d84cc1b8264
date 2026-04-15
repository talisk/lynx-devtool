"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "connect", {
  enumerable: true,
  get: () => connect
});
const _interop_require_default = require("@swc/helpers/_/_interop_require_default");
const _jsxruntime = require("react/jsx-runtime");
const _react = require("react");
const _store = require("@modern-js-reduck/store");
const _hoistnonreactstatics = /* @__PURE__ */ _interop_require_default._(require("hoist-non-react-statics"));
const _hook = require("./hook");
function connect(models, opt) {
  return (C) => withProxy(C, models, opt);
}
function withProxy(C, models, opt) {
  const actualModels = [];
  const selectors = [];
  const modelArr = Array.isArray(models) ? models : [
    models
  ];
  for (const model of modelArr) {
    if (_store.utils.isModel(model)) {
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
    const [mapState, mapActions] = (0, _hook.useModel)([
      ...actualModels,
      // FIXME: any
      finalStateSelector,
      finalActionSelector
    ]);
    const data = {
      ...mapState,
      ...mapActions,
      ...props
    };
    if (ref && config.forwardRef) {
      data.ref = ref;
    }
    return /* @__PURE__ */ (0, _jsxruntime.jsx)(C, {
      ...data
    });
  };
  Wrapper.displayName = `Connect(${C.displayName || C.name || "Anonymous"})}`;
  if (config.forwardRef) {
    const Forward = /* @__PURE__ */ (0, _react.forwardRef)(Wrapper);
    const MemoForward = /* @__PURE__ */ (0, _react.memo)(Forward);
    (0, _hoistnonreactstatics.default)(MemoForward, C);
    return MemoForward;
  }
  const MemoWrapper = /* @__PURE__ */ (0, _react.memo)(Wrapper);
  (0, _hoistnonreactstatics.default)(MemoWrapper, C);
  return MemoWrapper;
}
