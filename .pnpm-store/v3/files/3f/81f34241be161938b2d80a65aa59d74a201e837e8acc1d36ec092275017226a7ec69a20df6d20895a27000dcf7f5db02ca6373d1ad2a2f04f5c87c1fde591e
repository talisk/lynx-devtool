import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { DocumentStructureContext } from "./DocumentStructureContext";
import { DefaultRoot } from "./Root";
import { BODY_PARTICALS_SEPARATOR, DOCUMENT_CHUNKSMAP_PLACEHOLDER, DOCUMENT_SSRDATASCRIPT_PLACEHOLDER } from "./constants";
function Body(props) {
  var hasSetRoot = useContext(DocumentStructureContext).hasSetRoot;
  var children = props.children, rest = _object_without_properties(props, [
    "children"
  ]);
  return /* @__PURE__ */ _jsxs("body", _object_spread_props(_object_spread({}, rest), {
    children: [
      hasSetRoot ? null : /* @__PURE__ */ _jsx(DefaultRoot, {}),
      children,
      "".concat(BODY_PARTICALS_SEPARATOR),
      "".concat(DOCUMENT_CHUNKSMAP_PLACEHOLDER),
      "".concat(DOCUMENT_SSRDATASCRIPT_PLACEHOLDER)
    ]
  }));
}
export {
  Body
};
