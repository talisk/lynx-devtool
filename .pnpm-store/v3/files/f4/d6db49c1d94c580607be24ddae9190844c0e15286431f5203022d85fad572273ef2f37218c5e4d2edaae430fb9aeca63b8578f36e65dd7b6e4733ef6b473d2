var __getOwnPropNames = Object.getOwnPropertyNames;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_vercel_handler = __commonJS({
  "src/plugins/deploy/platforms/vercel-handler.cjs"(exports, module) {
    var _async_to_generator = require("@swc/helpers/_/_async_to_generator");
    var _object_spread = require("@swc/helpers/_/_object_spread");
    var _ts_generator = require("@swc/helpers/_/_ts_generator");
    var fs = require("node:fs/promises");
    var path = require("node:path");
    var createProdServer = require("@modern-js/prod-server").createProdServer;
    p_genPluginImportsCode;
    if (!process.env.NODE_ENV) {
      process.env.NODE_ENV = "production";
    }
    var requestHandler = null;
    var handlerCreationPromise = null;
    function loadRoutes(routeFilepath) {
      return _loadRoutes.apply(this, arguments);
    }
    function _loadRoutes() {
      _loadRoutes = _async_to_generator._(function(routeFilepath) {
        var content, routeSpec, error;
        return _ts_generator._(this, function(_state) {
          switch (_state.label) {
            case 0:
              _state.trys.push([
                0,
                3,
                ,
                4
              ]);
              return [
                4,
                fs.access(routeFilepath)
              ];
            case 1:
              _state.sent();
              return [
                4,
                fs.readFile(routeFilepath, "utf-8")
              ];
            case 2:
              content = _state.sent();
              routeSpec = JSON.parse(content);
              return [
                2,
                routeSpec.routes || []
              ];
            case 3:
              error = _state.sent();
              console.warn("route.json not found or invalid, continuing with empty routes.");
              return [
                2,
                []
              ];
            case 4:
              return [
                2
              ];
          }
        });
      });
      return _loadRoutes.apply(this, arguments);
    }
    function initServer() {
      return _initServer.apply(this, arguments);
    }
    function _initServer() {
      _initServer = _async_to_generator._(function() {
        var routeFilepath, routes, dynamicProdOptions, prodServerOptions, app;
        return _ts_generator._(this, function(_state) {
          switch (_state.label) {
            case 0:
              routeFilepath = path.join(__dirname, p_ROUTE_SPEC_FILE);
              return [
                4,
                loadRoutes(routeFilepath)
              ];
            case 1:
              routes = _state.sent();
              dynamicProdOptions = p_dynamicProdOptions;
              prodServerOptions = _object_spread._({
                pwd: __dirname,
                routes,
                disableCustomHook: true,
                appContext: {
                  sharedDirectory: p_sharedDirectory,
                  apiDirectory: p_apiDirectory,
                  lambdaDirectory: p_lambdaDirectory
                },
                plugins: p_plugins
              }, dynamicProdOptions);
              return [
                4,
                createProdServer(prodServerOptions)
              ];
            case 2:
              app = _state.sent();
              return [
                2,
                app.getRequestListener()
              ];
          }
        });
      });
      return _initServer.apply(this, arguments);
    }
    function createHandler() {
      return _createHandler.apply(this, arguments);
    }
    function _createHandler() {
      _createHandler = _async_to_generator._(function() {
        return _ts_generator._(this, function(_state) {
          switch (_state.label) {
            case 0:
              if (!handlerCreationPromise) {
                handlerCreationPromise = _async_to_generator._(function() {
                  var error;
                  return _ts_generator._(this, function(_state2) {
                    switch (_state2.label) {
                      case 0:
                        _state2.trys.push([
                          0,
                          2,
                          ,
                          3
                        ]);
                        return [
                          4,
                          initServer()
                        ];
                      case 1:
                        requestHandler = _state2.sent();
                        return [
                          3,
                          3
                        ];
                      case 2:
                        error = _state2.sent();
                        console.error("Error creating server:", error);
                        process.exit(1);
                        return [
                          3,
                          3
                        ];
                      case 3:
                        return [
                          2
                        ];
                    }
                  });
                })();
              }
              return [
                4,
                handlerCreationPromise
              ];
            case 1:
              _state.sent();
              return [
                2,
                requestHandler
              ];
          }
        });
      });
      return _createHandler.apply(this, arguments);
    }
    createHandler();
    var handler = function() {
      var _ref = _async_to_generator._(function(req, res) {
        return _ts_generator._(this, function(_state) {
          switch (_state.label) {
            case 0:
              if (!!requestHandler)
                return [
                  3,
                  2
                ];
              return [
                4,
                createHandler()
              ];
            case 1:
              _state.sent();
              _state.label = 2;
            case 2:
              return [
                2,
                requestHandler(req, res)
              ];
          }
        });
      });
      return function handler2(req, res) {
        return _ref.apply(this, arguments);
      };
    }();
    module.exports = {
      handler
    };
  }
});
export default require_vercel_handler();
