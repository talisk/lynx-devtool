import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { createServerBase } from "@modern-js/server-core";
import { createNodeServer, loadServerCliConfig, loadServerEnv, loadServerRuntimeConfig } from "@modern-js/server-core/node";
import sourceMapSupport from "source-map-support";
import { applyPlugins } from "./apply";
sourceMapSupport.install();
import { applyPlugins as applyPlugins2 } from "./apply";
import { loadServerPlugins, loadServerRuntimeConfig as loadServerRuntimeConfig2 } from "@modern-js/server-core/node";
var createProdServer = function() {
  var _ref = _async_to_generator(function(options) {
    var serverBaseOptions, serverCliConfig, serverRuntimeConfig, server, nodeServer;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            loadServerEnv(options)
          ];
        case 1:
          _state.sent();
          serverBaseOptions = options;
          serverCliConfig = process.env.NODE_ENV === "production" ? loadServerCliConfig(options.pwd, options.config) : options.config;
          if (serverCliConfig) {
            serverBaseOptions.config = serverCliConfig;
          }
          return [
            4,
            loadServerRuntimeConfig(options.pwd, options.serverConfigFile, options.serverConfigPath)
          ];
        case 2:
          serverRuntimeConfig = _state.sent();
          if (serverRuntimeConfig) {
            serverBaseOptions.serverConfig = serverRuntimeConfig;
          }
          server = createServerBase(serverBaseOptions);
          return [
            4,
            createNodeServer(server.handle.bind(server))
          ];
        case 3:
          nodeServer = _state.sent();
          return [
            4,
            applyPlugins(server, options, nodeServer)
          ];
        case 4:
          _state.sent();
          return [
            4,
            server.init()
          ];
        case 5:
          _state.sent();
          return [
            2,
            nodeServer
          ];
      }
    });
  });
  return function createProdServer2(options) {
    return _ref.apply(this, arguments);
  };
}();
export {
  applyPlugins2 as applyPlugins,
  createProdServer,
  loadServerPlugins,
  loadServerRuntimeConfig2 as loadServerRuntimeConfig
};
