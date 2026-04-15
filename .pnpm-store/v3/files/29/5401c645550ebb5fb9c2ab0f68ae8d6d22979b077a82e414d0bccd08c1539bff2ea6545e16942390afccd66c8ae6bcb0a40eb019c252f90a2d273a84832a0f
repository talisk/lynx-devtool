import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _class_private_method_get } from "@swc/helpers/_/_class_private_method_get";
import { _ as _class_private_method_init } from "@swc/helpers/_/_class_private_method_init";
import { _ as _create_class } from "@swc/helpers/_/_create_class";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { createContext } from "@modern-js/plugin";
import { Hono } from "hono";
import { PluginManager } from "./pluginManager";
var _getAppContext = /* @__PURE__ */ new WeakSet(), _applyMiddlewares = /* @__PURE__ */ new WeakSet();
var ServerBase = /* @__PURE__ */ function() {
  "use strict";
  function ServerBase2(options) {
    _class_call_check(this, ServerBase2);
    _class_private_method_init(this, _getAppContext);
    _class_private_method_init(this, _applyMiddlewares);
    this.options = options;
    var config = options.config, serverConfig = options.serverConfig;
    var appContext = _class_private_method_get(this, _getAppContext, getAppContext).call(this);
    this.appContext = appContext;
    this.pluginManager = new PluginManager({
      cliConfig: config,
      appContext,
      serverConfig
    });
    this.app = new Hono();
  }
  var _proto = ServerBase2.prototype;
  _proto.init = function init() {
    var _this = this;
    return _async_to_generator(function() {
      var runner;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            return [
              4,
              _this.pluginManager.init()
            ];
          case 1:
            runner = _state.sent();
            _this.runner = runner;
            return [
              4,
              runner.prepare()
            ];
          case 2:
            _state.sent();
            _class_private_method_get(_this, _applyMiddlewares, applyMiddlewares).call(_this);
            return [
              2,
              _this
            ];
        }
      });
    })();
  };
  _proto.addPlugins = function addPlugins(plugins) {
    this.pluginManager.addPlugins(plugins);
  };
  _create_class(ServerBase2, [
    {
      key: "all",
      get: function get() {
        return this.app.all.bind(this.app);
      }
    },
    {
      key: "use",
      get: function get() {
        return this.app.use.bind(this.app);
      }
    },
    {
      key: "get",
      get: function get() {
        return this.app.get.bind(this.app);
      }
    },
    {
      key: "post",
      get: function get() {
        return this.app.post.bind(this.app);
      }
    },
    {
      key: "put",
      get: function get() {
        return this.app.put.bind(this.app);
      }
    },
    {
      key: "delete",
      get: function get() {
        return this.app.delete.bind(this.app);
      }
    },
    {
      key: "patch",
      get: function get() {
        return this.app.patch.bind(this.app);
      }
    },
    {
      key: "handle",
      get: function get() {
        return this.app.fetch.bind(this.app);
      }
    },
    {
      key: "request",
      get: function get() {
        return this.app.request.bind(this.app);
      }
    },
    {
      key: "notFound",
      get: function get() {
        return this.app.notFound.bind(this.app);
      }
    },
    {
      key: "onError",
      get: function get() {
        return this.app.onError.bind(this.app);
      }
    }
  ]);
  return ServerBase2;
}();
function getAppContext() {
  var _this_options = this.options, context = _this_options.appContext, pwd = _this_options.pwd, routes = _this_options.routes, metaName = _this_options.metaName;
  var appContext = {
    routes,
    middlewares: [],
    appDirectory: (context === null || context === void 0 ? void 0 : context.appDirectory) || "",
    apiDirectory: context === null || context === void 0 ? void 0 : context.apiDirectory,
    internalDirectory: (context === null || context === void 0 ? void 0 : context.internalDirectory) || "",
    lambdaDirectory: context === null || context === void 0 ? void 0 : context.lambdaDirectory,
    sharedDirectory: (context === null || context === void 0 ? void 0 : context.sharedDirectory) || "",
    distDirectory: pwd,
    plugins: [],
    metaName: metaName || "modern-js",
    serverBase: this
  };
  return createContext(appContext);
}
function applyMiddlewares() {
  var middlewares = this.appContext.get().middlewares;
  var preMiddlewares = [];
  var defaultMiddlewares = [];
  var postMiddlewares = [];
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = middlewares[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var middleware = _step.value;
      switch (middleware.order) {
        case "pre":
          preMiddlewares.push(middleware);
          break;
        case "post":
          postMiddlewares.push(middleware);
          break;
        default:
          defaultMiddlewares.push(middleware);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return != null) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
  var finalMiddlewares = [];
  var insertMiddleware = function(middleware2) {
    if (middleware2.before) {
      var targetIndex = finalMiddlewares.findIndex(function(item) {
        var _middleware_before;
        if ((_middleware_before = middleware2.before) === null || _middleware_before === void 0 ? void 0 : _middleware_before.includes(item.name)) {
          return true;
        } else {
          return false;
        }
      });
      if (targetIndex !== -1) {
        finalMiddlewares.splice(targetIndex, 0, middleware2);
      } else {
        finalMiddlewares.push(middleware2);
      }
    } else {
      finalMiddlewares.push(middleware2);
    }
  };
  preMiddlewares.forEach(insertMiddleware);
  defaultMiddlewares.forEach(insertMiddleware);
  postMiddlewares.forEach(insertMiddleware);
  var _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
  try {
    for (var _iterator1 = finalMiddlewares[Symbol.iterator](), _step1; !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
      var middleware1 = _step1.value;
      var _this_app;
      var _middleware_path = middleware1.path, path = _middleware_path === void 0 ? "*" : _middleware_path, _middleware_method = middleware1.method, method = _middleware_method === void 0 ? "all" : _middleware_method, handler = middleware1.handler;
      var handlers = handler2Handlers(handler);
      (_this_app = this.app)[method].apply(_this_app, [
        path
      ].concat(_to_consumable_array(handlers)));
    }
  } catch (err) {
    _didIteratorError1 = true;
    _iteratorError1 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
        _iterator1.return();
      }
    } finally {
      if (_didIteratorError1) {
        throw _iteratorError1;
      }
    }
  }
  function handler2Handlers(handler2) {
    if (Array.isArray(handler2)) {
      return handler2;
    } else {
      return [
        handler2
      ];
    }
  }
}
function createServerBase(options) {
  if (options == null) {
    throw new Error("can not start server without options");
  }
  var server = new ServerBase(options);
  return server;
}
export {
  ServerBase,
  createServerBase
};
