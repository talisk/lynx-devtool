import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { connectMid2HonoMid } from "@modern-js/server-core/node";
import { API_DIR, SHARED_DIR } from "@modern-js/utils";
import { getDevOptions, getMockMiddleware, initFileReader, onRepack, startWatcher } from "./helpers";
var devPlugin = function(options) {
  return {
    name: "@modern-js/plugin-dev",
    setup: function setup(api) {
      var config = options.config, pwd = options.pwd, builder = options.builder, builderDevServer = options.builderDevServer;
      var closeCb = [];
      var dev = getDevOptions(options);
      return {
        prepare: function prepare() {
          return _async_to_generator(function() {
            var _dev_after, _dev_before, _ref, builderMiddlewares, close, connectWebSocket, _api_useAppContext, middlewares, distDirectory, nodeServer, apiDirectory, sharedDirectory, serverBase, runner, watchOptions, watcher, before, after, _dev_setupMiddlewares, setupMiddlewares, mockMiddleware;
            return _ts_generator(this, function(_state) {
              switch (_state.label) {
                case 0:
                  _ref = builderDevServer || {}, builderMiddlewares = _ref.middlewares, close = _ref.close, connectWebSocket = _ref.connectWebSocket;
                  close && closeCb.push(close);
                  _api_useAppContext = api.useAppContext(), middlewares = _api_useAppContext.middlewares, distDirectory = _api_useAppContext.distDirectory, nodeServer = _api_useAppContext.nodeServer, apiDirectory = _api_useAppContext.apiDirectory, sharedDirectory = _api_useAppContext.sharedDirectory, serverBase = _api_useAppContext.serverBase;
                  connectWebSocket && nodeServer && connectWebSocket({
                    server: nodeServer
                  });
                  runner = api.useHookRunners();
                  builder === null || builder === void 0 ? void 0 : builder.onDevCompileDone(function(param) {
                    var stats = param.stats;
                    if (stats.toJson({
                      all: false
                    }).name !== "server") {
                      onRepack(distDirectory, runner);
                    }
                  });
                  if (dev.watch) {
                    watchOptions = config.server.watchOptions;
                    watcher = startWatcher({
                      pwd,
                      distDir: distDirectory,
                      apiDir: apiDirectory || API_DIR,
                      sharedDir: sharedDirectory || SHARED_DIR,
                      watchOptions,
                      server: serverBase
                    });
                    closeCb.push(watcher.close.bind(watcher));
                  }
                  closeCb.length > 0 && (nodeServer === null || nodeServer === void 0 ? void 0 : nodeServer.on("close", function() {
                    closeCb.forEach(function(cb) {
                      cb();
                    });
                  }));
                  before = [];
                  after = [];
                  _dev_setupMiddlewares = dev.setupMiddlewares, setupMiddlewares = _dev_setupMiddlewares === void 0 ? [] : _dev_setupMiddlewares;
                  if (((_dev_after = dev.after) === null || _dev_after === void 0 ? void 0 : _dev_after.length) || ((_dev_before = dev.before) === null || _dev_before === void 0 ? void 0 : _dev_before.length)) {
                    setupMiddlewares.push(function(middlewares2) {
                      var _middlewares, _middlewares1;
                      (_middlewares = middlewares2).unshift.apply(_middlewares, _to_consumable_array(dev.before || []));
                      (_middlewares1 = middlewares2).push.apply(_middlewares1, _to_consumable_array(dev.after || []));
                    });
                  }
                  setupMiddlewares.forEach(function(handler) {
                    var _before, _after;
                    handler({
                      unshift: function() {
                        for (var _len = arguments.length, handlers = new Array(_len), _key = 0; _key < _len; _key++) {
                          handlers[_key] = arguments[_key];
                        }
                        return (_before = before).unshift.apply(_before, _to_consumable_array(handlers));
                      },
                      push: function() {
                        for (var _len = arguments.length, handlers = new Array(_len), _key = 0; _key < _len; _key++) {
                          handlers[_key] = arguments[_key];
                        }
                        return (_after = after).push.apply(_after, _to_consumable_array(handlers));
                      }
                    }, {
                      sockWrite: function() {
                      }
                    });
                  });
                  before.forEach(function(middleware, index) {
                    middlewares.push({
                      name: "before-dev-server-".concat(index),
                      handler: connectMid2HonoMid(middleware)
                    });
                  });
                  return [
                    4,
                    getMockMiddleware(pwd)
                  ];
                case 1:
                  mockMiddleware = _state.sent();
                  middlewares.push({
                    name: "mock-dev",
                    handler: mockMiddleware
                  });
                  builderMiddlewares && middlewares.push({
                    name: "rsbuild-dev",
                    handler: connectMid2HonoMid(builderMiddlewares)
                  });
                  after.forEach(function(middleware, index) {
                    middlewares.push({
                      name: "after-dev-server-".concat(index),
                      handler: connectMid2HonoMid(middleware)
                    });
                  });
                  middlewares.push({
                    name: "init-file-reader",
                    handler: initFileReader()
                  });
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
export {
  devPlugin
};
