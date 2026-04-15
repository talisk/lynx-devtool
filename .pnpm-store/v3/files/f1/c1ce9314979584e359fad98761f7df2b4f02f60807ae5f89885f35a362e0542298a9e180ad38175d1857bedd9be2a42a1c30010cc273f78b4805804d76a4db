import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
var injectNodeSeverPlugin = function(param) {
  var nodeServer = param.nodeServer;
  return {
    name: "@modern-js/plugin-inject-node-server",
    setup: function setup(api) {
      var appContext = api.useAppContext();
      api.setAppContext(_object_spread_props(_object_spread({}, appContext), {
        nodeServer
      }));
      return {};
    }
  };
};
export {
  injectNodeSeverPlugin
};
