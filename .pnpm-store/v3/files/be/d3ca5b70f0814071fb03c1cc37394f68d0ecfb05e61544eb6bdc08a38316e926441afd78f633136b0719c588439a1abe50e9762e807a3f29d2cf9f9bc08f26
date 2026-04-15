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
var withRouter_exports = {};
__export(withRouter_exports, {
  withRouter: () => withRouter
});
module.exports = __toCommonJS(withRouter_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_router = require("@modern-js/runtime-utils/router");
const withRouter = (Component) => {
  return (props) => {
    const location = (0, import_router.useLocation)();
    const params = (0, import_router.useParams)();
    const navigate = (0, import_router.useNavigate)();
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Component, {
      ...props,
      location,
      params,
      navigate
    });
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  withRouter
});
