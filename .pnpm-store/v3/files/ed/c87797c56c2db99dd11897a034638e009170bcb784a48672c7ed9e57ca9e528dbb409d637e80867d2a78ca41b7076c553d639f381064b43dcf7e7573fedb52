import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsxs as _jsxs } from "react/jsx-runtime";
import { omit } from "@modern-js/utils/lodash";
import { useContext } from "react";
import { DocumentContext } from "./DocumentContext";
import { DOCUMENT_SSR_PLACEHOLDER } from "./constants";
function Root(props) {
  var rootId = props.rootId, children = props.children, rest = _object_without_properties(props, [
    "rootId",
    "children"
  ]);
  var legalProperties = omit(rest, "id");
  var _useContext = useContext(DocumentContext), _useContext_templateParams = _useContext.templateParams, _useContext_templateParams_mountId = _useContext_templateParams.mountId, mountId = _useContext_templateParams_mountId === void 0 ? "root" : _useContext_templateParams_mountId;
  return (
    // in case for properities order not keep
    /* @__PURE__ */ _jsxs("div", _object_spread_props(_object_spread({
      id: "".concat(rootId || mountId)
    }, legalProperties), {
      children: [
        "".concat(DOCUMENT_SSR_PLACEHOLDER),
        children
      ]
    }))
  );
}
function DefaultRoot(props) {
  var _useContext = useContext(DocumentContext), _useContext_templateParams = _useContext.templateParams, _useContext_templateParams_mountId = _useContext_templateParams.mountId, mountId = _useContext_templateParams_mountId === void 0 ? "root" : _useContext_templateParams_mountId;
  return /* @__PURE__ */ _jsxs("div", {
    id: "".concat(mountId),
    children: [
      "".concat(DOCUMENT_SSR_PLACEHOLDER),
      props.children
    ]
  });
}
export {
  DefaultRoot,
  Root
};
