"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Root_exports = {};
__export(Root_exports, {
  DefaultRoot: () => DefaultRoot,
  Root: () => Root
});
module.exports = __toCommonJS(Root_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_lodash = require("@modern-js/utils/lodash");
var import_react = require("react");
var import_DocumentContext = require("./DocumentContext");
var import_constants = require("./constants");
function Root(props) {
  const { rootId, children, ...rest } = props;
  const legalProperties = (0, import_lodash.omit)(rest, "id");
  const { templateParams: { mountId = "root" } } = (0, import_react.useContext)(import_DocumentContext.DocumentContext);
  return (
    // in case for properities order not keep
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
      id: `${rootId || mountId}`,
      ...legalProperties,
      children: [
        `${import_constants.DOCUMENT_SSR_PLACEHOLDER}`,
        children
      ]
    })
  );
}
function DefaultRoot(props) {
  const { templateParams: { mountId = "root" } } = (0, import_react.useContext)(import_DocumentContext.DocumentContext);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
    id: `${mountId}`,
    children: [
      `${import_constants.DOCUMENT_SSR_PLACEHOLDER}`,
      props.children
    ]
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultRoot,
  Root
});
