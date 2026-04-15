import { jsxs as _jsxs } from "react/jsx-runtime";
import { omit } from "@modern-js/utils/lodash";
import { useContext } from "react";
import { DocumentContext } from "./DocumentContext";
import { DOCUMENT_SSR_PLACEHOLDER } from "./constants";
function Root(props) {
  const { rootId, children, ...rest } = props;
  const legalProperties = omit(rest, "id");
  const { templateParams: { mountId = "root" } } = useContext(DocumentContext);
  return (
    // in case for properities order not keep
    /* @__PURE__ */ _jsxs("div", {
      id: `${rootId || mountId}`,
      ...legalProperties,
      children: [
        `${DOCUMENT_SSR_PLACEHOLDER}`,
        children
      ]
    })
  );
}
function DefaultRoot(props) {
  const { templateParams: { mountId = "root" } } = useContext(DocumentContext);
  return /* @__PURE__ */ _jsxs("div", {
    id: `${mountId}`,
    children: [
      `${DOCUMENT_SSR_PLACEHOLDER}`,
      props.children
    ]
  });
}
export {
  DefaultRoot,
  Root
};
