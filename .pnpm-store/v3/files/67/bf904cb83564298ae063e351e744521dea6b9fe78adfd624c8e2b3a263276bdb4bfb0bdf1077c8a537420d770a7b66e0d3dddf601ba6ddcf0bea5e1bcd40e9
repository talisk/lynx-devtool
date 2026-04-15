import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Body } from "./Body";
import { DocumentStructureContext } from "./DocumentStructureContext";
import { Head } from "./Head";
function findTargetChild(tag, children) {
  return children.find(function(item) {
    return getEleType(item) === tag;
  });
}
function getEleType(ele) {
  return typeof (ele === null || ele === void 0 ? void 0 : ele.type) === "function" ? ele.type.name : ele === null || ele === void 0 ? void 0 : ele.type;
}
function findTargetElement(tag, children) {
  if (children.length === 0) {
    return null;
  }
  var nextChildren = [];
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;
      var _item_props;
      if (tag === getEleType(item)) {
        return item;
      }
      if (item === null || item === void 0 ? void 0 : (_item_props = item.props) === null || _item_props === void 0 ? void 0 : _item_props.children) {
        nextChildren = nextChildren.concat(item.props.children);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  return findTargetElement(tag, nextChildren);
}
function Html(props) {
  var children = props.children, rest = _object_without_properties(props, [
    "children"
  ]);
  var hasSetHead = Boolean(findTargetChild("Head", children));
  var hasSetScripts = Boolean(findTargetElement("Scripts", children));
  var hasSetLinks = Boolean(findTargetElement("Links", children));
  var hasSetBody = Boolean(findTargetChild("Body", children));
  var hasSetRoot = Boolean(findTargetElement("Root", children));
  var hasSetTitle = Boolean(findTargetElement("title", children));
  var notMissMustChild = [
    hasSetHead,
    hasSetBody
  ].every(function(item) {
    return item;
  });
  if (!notMissMustChild) {
    return /* @__PURE__ */ _jsx("html", {
      children: /* @__PURE__ */ _jsxs("body", {
        style: {
          color: "red"
        },
        children: [
          "Miss the ",
          [
            hasSetHead,
            hasSetBody
          ].map(function(item, index) {
            return item ? null : [
              "Head",
              "Body"
            ][index];
          }),
          " Element"
        ]
      })
    });
  }
  return /* @__PURE__ */ _jsx("html", _object_spread_props(_object_spread({}, rest), {
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
  }));
}
export {
  Html
};
