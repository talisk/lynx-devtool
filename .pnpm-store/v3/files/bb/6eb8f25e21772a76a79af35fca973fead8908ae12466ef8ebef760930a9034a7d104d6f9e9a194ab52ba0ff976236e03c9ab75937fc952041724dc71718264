import { jsx as _jsx } from "react/jsx-runtime";
import { useLocation, useNavigate, useParams } from "@modern-js/runtime-utils/router";
const withRouter = (Component) => {
  return (props) => {
    const location = useLocation();
    const params = useParams();
    const navigate = useNavigate();
    return /* @__PURE__ */ _jsx(Component, {
      ...props,
      location,
      params,
      navigate
    });
  };
};
export {
  withRouter
};
