import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { merge } from "ts-deepmerge";
var loadConfig = function(param) {
  var cliConfig = param.cliConfig, serverConfig = param.serverConfig;
  var config = merge(_object_spread_props(_object_spread({}, cliConfig), {
    plugins: []
  }), serverConfig);
  return config;
};
export {
  loadConfig
};
