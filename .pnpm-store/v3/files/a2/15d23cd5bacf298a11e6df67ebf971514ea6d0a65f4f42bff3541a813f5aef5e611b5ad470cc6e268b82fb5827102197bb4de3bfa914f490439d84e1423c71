import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { createServerBase } from "@modern-js/server-core";
import { loadServerCliConfig, loadServerEnv } from "@modern-js/server-core/node";
import { applyPlugins } from "./apply";
var createNetlifyFunction = function() {
  var _ref = _async_to_generator(function(options) {
    var serverCliConfig, server;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          serverCliConfig = loadServerCliConfig(options.pwd, options.config);
          if (serverCliConfig) {
            options.config = serverCliConfig;
          }
          server = createServerBase(options);
          return [
            4,
            loadServerEnv(options)
          ];
        case 1:
          _state.sent();
          return [
            4,
            applyPlugins(server, options)
          ];
        case 2:
          _state.sent();
          return [
            4,
            server.init()
          ];
        case 3:
          _state.sent();
          return [
            2,
            function(request, context) {
              return server.handle(request, context);
            }
          ];
      }
    });
  });
  return function createNetlifyFunction2(options) {
    return _ref.apply(this, arguments);
  };
}();
export {
  createNetlifyFunction
};
