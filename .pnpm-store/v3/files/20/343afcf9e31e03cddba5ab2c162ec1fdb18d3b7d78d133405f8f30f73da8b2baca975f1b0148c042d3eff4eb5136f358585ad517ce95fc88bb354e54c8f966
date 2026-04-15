import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { jsx as _jsx } from "react/jsx-runtime";
import { useLocation, useNavigate, useParams } from "@modern-js/runtime-utils/router";
var withRouter = function(Component) {
  return function(props) {
    var location = useLocation();
    var params = useParams();
    var navigate = useNavigate();
    return /* @__PURE__ */ _jsx(Component, _object_spread_props(_object_spread({}, props), {
      location,
      params,
      navigate
    }));
  };
};
export {
  withRouter
};
