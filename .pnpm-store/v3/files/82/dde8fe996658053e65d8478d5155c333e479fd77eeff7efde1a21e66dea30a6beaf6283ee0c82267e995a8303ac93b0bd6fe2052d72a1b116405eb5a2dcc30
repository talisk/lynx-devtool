import { _ as _class_private_method_get } from "@swc/helpers/_/_class_private_method_get";
import { _ as _class_private_method_init } from "@swc/helpers/_/_class_private_method_init";
import { createContext } from "@modern-js/plugin";
import { Hono } from "hono";
import { PluginManager } from "./pluginManager";
var _getAppContext = /* @__PURE__ */ new WeakSet(), _applyMiddlewares = /* @__PURE__ */ new WeakSet();
class ServerBase {
  /**
  * 初始化顺序
  * - 初始化 pluginManager;
  * - 执行 runner.prepare;
  * - 应用 middlewares
  */
  async init() {
    const runner = await this.pluginManager.init();
    this.runner = runner;
    await runner.prepare();
    _class_private_method_get(this, _applyMiddlewares, applyMiddlewares).call(this);
    return this;
  }
  addPlugins(plugins) {
    this.pluginManager.addPlugins(plugins);
  }
  get all() {
    return this.app.all.bind(this.app);
  }
  get use() {
    return this.app.use.bind(this.app);
  }
  get get() {
    return this.app.get.bind(this.app);
  }
  get post() {
    return this.app.post.bind(this.app);
  }
  get put() {
    return this.app.put.bind(this.app);
  }
  get delete() {
    return this.app.delete.bind(this.app);
  }
  get patch() {
    return this.app.patch.bind(this.app);
  }
  get handle() {
    return this.app.fetch.bind(this.app);
  }
  get request() {
    return this.app.request.bind(this.app);
  }
  get notFound() {
    return this.app.notFound.bind(this.app);
  }
  get onError() {
    return this.app.onError.bind(this.app);
  }
  constructor(options) {
    _class_private_method_init(this, _getAppContext);
    _class_private_method_init(this, _applyMiddlewares);
    this.options = options;
    const { config, serverConfig } = options;
    const appContext = _class_private_method_get(this, _getAppContext, getAppContext).call(this);
    this.appContext = appContext;
    this.pluginManager = new PluginManager({
      cliConfig: config,
      appContext,
      serverConfig
    });
    this.app = new Hono();
  }
}
function getAppContext() {
  const { appContext: context, pwd, routes, metaName } = this.options;
  const appContext = {
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
  const { middlewares } = this.appContext.get();
  const preMiddlewares = [];
  const defaultMiddlewares = [];
  const postMiddlewares = [];
  for (const middleware of middlewares) {
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
  const finalMiddlewares = [];
  const insertMiddleware = (middleware) => {
    if (middleware.before) {
      const targetIndex = finalMiddlewares.findIndex((item) => {
        var _middleware_before;
        if ((_middleware_before = middleware.before) === null || _middleware_before === void 0 ? void 0 : _middleware_before.includes(item.name)) {
          return true;
        } else {
          return false;
        }
      });
      if (targetIndex !== -1) {
        finalMiddlewares.splice(targetIndex, 0, middleware);
      } else {
        finalMiddlewares.push(middleware);
      }
    } else {
      finalMiddlewares.push(middleware);
    }
  };
  preMiddlewares.forEach(insertMiddleware);
  defaultMiddlewares.forEach(insertMiddleware);
  postMiddlewares.forEach(insertMiddleware);
  for (const middleware of finalMiddlewares) {
    const { path = "*", method = "all", handler } = middleware;
    const handlers = handler2Handlers(handler);
    this.app[method](path, ...handlers);
  }
  function handler2Handlers(handler) {
    if (Array.isArray(handler)) {
      return handler;
    } else {
      return [
        handler
      ];
    }
  }
}
function createServerBase(options) {
  if (options == null) {
    throw new Error("can not start server without options");
  }
  const server = new ServerBase(options);
  return server;
}
export {
  ServerBase,
  createServerBase
};
