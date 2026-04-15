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
var Html_exports = {};
__export(Html_exports, {
  Html: () => Html
});
module.exports = __toCommonJS(Html_exports);
var import_jsx_runtime = require("react/jsx-runtime");
var import_Body = require("./Body");
var import_DocumentStructureContext = require("./DocumentStructureContext");
var import_Head = require("./Head");
function findTargetChild(tag, children) {
  return children.find((item) => getEleType(item) === tag);
}
function getEleType(ele) {
  return typeof (ele === null || ele === void 0 ? void 0 : ele.type) === "function" ? ele.type.name : ele === null || ele === void 0 ? void 0 : ele.type;
}
function findTargetElement(tag, children) {
  if (children.length === 0) {
    return null;
  }
  let nextChildren = [];
  for (const item of children) {
    var _item_props;
    if (tag === getEleType(item)) {
      return item;
    }
    if (item === null || item === void 0 ? void 0 : (_item_props = item.props) === null || _item_props === void 0 ? void 0 : _item_props.children) {
      nextChildren = nextChildren.concat(item.props.children);
    }
  }
  return findTargetElement(tag, nextChildren);
}
function Html(props) {
  const { children, ...rest } = props;
  const hasSetHead = Boolean(findTargetChild("Head", children));
  const hasSetScripts = Boolean(findTargetElement("Scripts", children));
  const hasSetLinks = Boolean(findTargetElement("Links", children));
  const hasSetBody = Boolean(findTargetChild("Body", children));
  const hasSetRoot = Boolean(findTargetElement("Root", children));
  const hasSetTitle = Boolean(findTargetElement("title", children));
  const notMissMustChild = [
    hasSetHead,
    hasSetBody
  ].every((item) => item);
  if (!notMissMustChild) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("html", {
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", {
        style: {
          color: "red"
        },
        children: [
          `Miss the `,
          [
            hasSetHead,
            hasSetBody
          ].map((item, index) => {
            return item ? null : [
              "Head",
              "Body"
            ][index];
          }),
          ` Element`
        ]
      })
    });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("html", {
    ...rest,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_DocumentStructureContext.DocumentStructureContext.Provider, {
      value: {
        hasSetHead,
        hasSetScripts,
        hasSetLinks,
        hasSetRoot,
        hasSetBody,
        hasSetTitle,
        docChild: children
      },
      children: [
        !hasSetHead && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Head.Head, {}),
        !hasSetBody && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_Body.Body, {}),
        children
      ]
    })
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Html
});
