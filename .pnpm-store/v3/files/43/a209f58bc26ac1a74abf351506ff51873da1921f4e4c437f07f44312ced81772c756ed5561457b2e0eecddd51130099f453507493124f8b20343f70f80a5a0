"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var serverBase_exports = {};
__export(serverBase_exports, {
  ServerBase: () => ServerBase,
  createServerBase: () => createServerBase
});
module.exports = __toCommonJS(serverBase_exports);
var import_class_private_method_get = require("@swc/helpers/_/_class_private_method_get");
var import_class_private_method_init = require("@swc/helpers/_/_class_private_method_init");
var import_plugin = require("@modern-js/plugin");
var import_hono = require("hono");
var import_pluginManager = require("./pluginManager");
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
    (0, import_class_private_method_get._)(this, _applyMiddlewares, applyMiddlewares).call(this);
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
    (0, import_class_private_method_init._)(this, _getAppContext);
    (0, import_class_private_method_init._)(this, _applyMiddlewares);
    this.options = options;
    const { config, serverConfig } = options;
    const appContext = (0, import_class_private_method_get._)(this, _getAppContext, getAppContext).call(this);
    this.appContext = appContext;
    this.pluginManager = new import_pluginManager.PluginManager({
      cliConfig: config,
      appContext,
      serverConfig
    });
    this.app = new import_hono.Hono();
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
  return (0, import_plugin.createContext)(appContext);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ServerBase,
  createServerBase
});
