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
var Body_exports = {};
__export(Body_exports, {
  Body: () => Body
});
module.exports = __toCommonJS(Body_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_DocumentStructureContext = require("./DocumentStructureContext");
var import_Root = require("./Root");
var import_constants = require("./constants");
function Body(props) {
  const { hasSetRoot } = (0, import_react.useContext)(import_DocumentStructureContext.DocumentStructureContext);
  const { children, ...rest } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
    ...rest,
    children: [
      hasSetRoot ? null : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Root.DefaultRoot, {}),
      children,
      `${import_constants.BODY_PARTICALS_SEPARATOR}`,
      `${import_constants.DOCUMENT_CHUNKSMAP_PLACEHOLDER}`,
      `${import_constants.DOCUMENT_SSRDATASCRIPT_PLACEHOLDER}`
    ]
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Body
});
