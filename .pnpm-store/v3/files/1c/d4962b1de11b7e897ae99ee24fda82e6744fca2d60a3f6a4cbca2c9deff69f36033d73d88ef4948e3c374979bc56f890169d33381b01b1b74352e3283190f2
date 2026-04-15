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
var Head_exports = {};
__export(Head_exports, {
  DefaultHead: () => DefaultHead,
  Head: () => Head
});
module.exports = __toCommonJS(Head_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_react = require("react");
var import_DocumentStructureContext = require("./DocumentStructureContext");
var import_Links = require("./Links");
var import_Scripts = require("./Scripts");
var import_Title = require("./Title");
var import_constants = require("./constants");
function Head(props) {
  const { hasSetScripts, hasSetLinks, hasSetTitle } = (0, import_react.useContext)(import_DocumentStructureContext.DocumentStructureContext);
  const { children, ...rest } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("head", {
    ...rest,
    children: [
      import_constants.TOP_PARTICALS_SEPARATOR,
      import_constants.DOCUMENT_META_PLACEHOLDER,
      !hasSetTitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Title.Title, {}),
      !hasSetLinks && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Links.Links, {}),
      !hasSetScripts && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Scripts.Scripts, {}),
      import_constants.HEAD_PARTICALS_SEPARATOR,
      children
    ]
  });
}
function DefaultHead() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", {
    children: import_constants.DOCUMENT_META_PLACEHOLDER
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DefaultHead,
  Head
});
