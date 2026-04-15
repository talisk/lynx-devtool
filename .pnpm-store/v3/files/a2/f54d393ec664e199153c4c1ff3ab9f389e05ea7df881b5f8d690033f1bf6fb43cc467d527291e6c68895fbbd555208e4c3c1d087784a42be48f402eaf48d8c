import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body } from "./Body";
import { DocumentStructureContext } from "./DocumentStructureContext";
import { Head } from "./Head";
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
    return /* @__PURE__ */ _jsx("html", {
      children: /* @__PURE__ */ _jsxs("body", {
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
  return /* @__PURE__ */ _jsx("html", {
    ...rest,
    children: /* @__PURE__ */ _jsxs(DocumentStructureContext.Provider, {
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
        !hasSetHead && /* @__PURE__ */ _jsx(Head, {}),
        !hasSetBody && /* @__PURE__ */ _jsx(Body, {}),
        children
      ]
    })
  });
}
export {
  Html
};
