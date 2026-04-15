import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _type_of } from "@swc/helpers/_/_type_of";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { createRender } from "./render";
var injectRenderHandlerPlugin = function(param) {
  var staticGenerate = param.staticGenerate, cacheConfig = param.cacheConfig;
  return {
    name: "@modern-js/plugin-inject-render",
    setup: function setup(api) {
      return {
        prepare: function prepare() {
          return _async_to_generator(function() {
            var _config_render, _api_useAppContext, pwd, routes, metaName, config, hookRunner, onFallback, getRenderHandlerOptions, render;
            return _ts_generator(this, function(_state) {
              switch (_state.label) {
                case 0:
                  _api_useAppContext = api.useAppContext(), pwd = _api_useAppContext.distDirectory, routes = _api_useAppContext.routes, metaName = _api_useAppContext.metaName;
                  config = api.useConfigContext();
                  hookRunner = api.useHookRunners();
                  if (!routes) {
                    return [
                      2
                    ];
                  }
                  onFallback = function() {
                    var _ref = _async_to_generator(function(reason, utils, error) {
                      return _ts_generator(this, function(_state2) {
                        switch (_state2.label) {
                          case 0:
                            return [
                              4,
                              hookRunner.fallback(_object_spread_props(_object_spread({
                                reason
                              }, utils), {
                                error
                              }))
                            ];
                          case 1:
                            _state2.sent();
                            return [
                              2
                            ];
                        }
                      });
                    });
                    return function onFallback2(reason, utils, error) {
                      return _ref.apply(this, arguments);
                    };
                  }();
                  getRenderHandlerOptions = {
                    pwd,
                    routes,
                    config,
                    metaName,
                    cacheConfig: ((_config_render = config.render) === null || _config_render === void 0 ? void 0 : _config_render.cache) || cacheConfig,
                    staticGenerate,
                    onFallback
                  };
                  return [
                    4,
                    getRenderHandler(getRenderHandlerOptions)
                  ];
                case 1:
                  render = _state.sent();
                  api.setAppContext(_object_spread_props(_object_spread({}, api.useAppContext()), {
                    render,
                    getRenderOptions: getRenderHandlerOptions
                  }));
                  return [
                    2
                  ];
              }
            });
          })();
        }
      };
    }
  };
};
function getRenderHandler(_) {
  return _getRenderHandler.apply(this, arguments);
}
function _getRenderHandler() {
  _getRenderHandler = _async_to_generator(function(param) {
    var pwd, routes, config, cacheConfig, metaName, staticGenerate, onFallback, _config_server, _config_security, ssrConfig, forceCSR, render;
    return _ts_generator(this, function(_state) {
      pwd = param.pwd, routes = param.routes, config = param.config, cacheConfig = param.cacheConfig, metaName = param.metaName, staticGenerate = param.staticGenerate, onFallback = param.onFallback;
      ssrConfig = (_config_server = config.server) === null || _config_server === void 0 ? void 0 : _config_server.ssr;
      forceCSR = (typeof ssrConfig === "undefined" ? "undefined" : _type_of(ssrConfig)) === "object" ? ssrConfig.forceCSR : false;
      render = createRender({
        routes,
        pwd,
        config,
        staticGenerate,
        cacheConfig,
        forceCSR,
        nonce: (_config_security = config.security) === null || _config_security === void 0 ? void 0 : _config_security.nonce,
        metaName: metaName || "modern-js",
        onFallback
      });
      return [
        2,
        render
      ];
    });
  });
  return _getRenderHandler.apply(this, arguments);
}
export {
  getRenderHandler,
  injectRenderHandlerPlugin
};
