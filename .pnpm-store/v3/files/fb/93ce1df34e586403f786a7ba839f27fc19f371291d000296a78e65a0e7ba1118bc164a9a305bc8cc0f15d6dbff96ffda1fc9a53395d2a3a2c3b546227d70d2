import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { DocumentStructureContext } from "./DocumentStructureContext";
import { Links } from "./Links";
import { Scripts } from "./Scripts";
import { Title } from "./Title";
import { DOCUMENT_META_PLACEHOLDER, HEAD_PARTICALS_SEPARATOR, TOP_PARTICALS_SEPARATOR } from "./constants";
function Head(props) {
  var _useContext = useContext(DocumentStructureContext), hasSetScripts = _useContext.hasSetScripts, hasSetLinks = _useContext.hasSetLinks, hasSetTitle = _useContext.hasSetTitle;
  var children = props.children, rest = _object_without_properties(props, [
    "children"
  ]);
  return /* @__PURE__ */ _jsxs("head", _object_spread_props(_object_spread({}, rest), {
    children: [
      TOP_PARTICALS_SEPARATOR,
      DOCUMENT_META_PLACEHOLDER,
      !hasSetTitle && /* @__PURE__ */ _jsx(Title, {}),
      !hasSetLinks && /* @__PURE__ */ _jsx(Links, {}),
      !hasSetScripts && /* @__PURE__ */ _jsx(Scripts, {}),
      HEAD_PARTICALS_SEPARATOR,
      children
    ]
  }));
}
function DefaultHead() {
  return /* @__PURE__ */ _jsx("head", {
    children: DOCUMENT_META_PLACEHOLDER
  });
}
export {
  DefaultHead,
  Head
};
