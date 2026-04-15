import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { DocumentStructureContext } from "./DocumentStructureContext";
import { Links } from "./Links";
import { Scripts } from "./Scripts";
import { Title } from "./Title";
import { DOCUMENT_META_PLACEHOLDER, HEAD_PARTICALS_SEPARATOR, TOP_PARTICALS_SEPARATOR } from "./constants";
function Head(props) {
  const { hasSetScripts, hasSetLinks, hasSetTitle } = useContext(DocumentStructureContext);
  const { children, ...rest } = props;
  return /* @__PURE__ */ _jsxs("head", {
    ...rest,
    children: [
      TOP_PARTICALS_SEPARATOR,
      DOCUMENT_META_PLACEHOLDER,
      !hasSetTitle && /* @__PURE__ */ _jsx(Title, {}),
      !hasSetLinks && /* @__PURE__ */ _jsx(Links, {}),
      !hasSetScripts && /* @__PURE__ */ _jsx(Scripts, {}),
      HEAD_PARTICALS_SEPARATOR,
      children
    ]
  });
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
