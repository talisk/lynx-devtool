import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import path from "path";
import { ENTRY_POINT_REGISTER_FILE_NAME } from "./constants";
var builderPluginAlias = function(param) {
  var entrypoints = param.entrypoints, internalDirectory = param.internalDirectory, metaName = param.metaName;
  return {
    name: "runtime:alias",
    setup: function setup(api) {
      api.modifyRsbuildConfig(function(userConfig, param2) {
        var mergeRsbuildConfig = param2.mergeRsbuildConfig;
        var entrypointsAlias = {};
        var mainEntrypointsAlias = {};
        entrypoints.forEach(function(entrypoint) {
          entrypointsAlias["@".concat(metaName, "/runtime/registry/").concat(entrypoint.entryName)] = path.join(internalDirectory, entrypoint.entryName, ENTRY_POINT_REGISTER_FILE_NAME);
          if (entrypoint.isMainEntry) {
            mainEntrypointsAlias["@".concat(metaName, "/runtime/registry")] = path.join(internalDirectory, entrypoint.entryName, ENTRY_POINT_REGISTER_FILE_NAME);
          }
        });
        return mergeRsbuildConfig(userConfig, {
          source: {
            alias: _object_spread({}, entrypointsAlias, mainEntrypointsAlias)
          }
        });
      });
    }
  };
};
export {
  builderPluginAlias
};
