import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from "react";
import { DocumentStructureContext } from "./DocumentStructureContext";
import { DefaultRoot } from "./Root";
import { BODY_PARTICALS_SEPARATOR, DOCUMENT_CHUNKSMAP_PLACEHOLDER, DOCUMENT_SSRDATASCRIPT_PLACEHOLDER } from "./constants";
function Body(props) {
  const { hasSetRoot } = useContext(DocumentStructureContext);
  const { children, ...rest } = props;
  return /* @__PURE__ */ _jsxs("body", {
    ...rest,
    children: [
      hasSetRoot ? null : /* @__PURE__ */ _jsx(DefaultRoot, {}),
      children,
      `${BODY_PARTICALS_SEPARATOR}`,
      `${DOCUMENT_CHUNKSMAP_PLACEHOLDER}`,
      `${DOCUMENT_SSRDATASCRIPT_PLACEHOLDER}`
    ]
  });
}
export {
  Body
};
