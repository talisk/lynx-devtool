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
var dev_exports = {};
__export(dev_exports, {
  devPlugin: () => devPlugin
});
module.exports = __toCommonJS(dev_exports);
var import_node = require("@modern-js/server-core/node");
var import_utils = require("@modern-js/utils");
var import_helpers = require("./helpers");
const devPlugin = (options) => ({
  name: "@modern-js/plugin-dev",
  setup(api) {
    const { config, pwd, builder, builderDevServer } = options;
    const closeCb = [];
    const dev = (0, import_helpers.getDevOptions)(options);
    return {
      async prepare() {
        var _dev_after, _dev_before;
        const { middlewares: builderMiddlewares, close, connectWebSocket } = builderDevServer || {};
        close && closeCb.push(close);
        const { middlewares, distDirectory, nodeServer, apiDirectory, sharedDirectory, serverBase } = api.useAppContext();
        connectWebSocket && nodeServer && connectWebSocket({
          server: nodeServer
        });
        const runner = api.useHookRunners();
        builder === null || builder === void 0 ? void 0 : builder.onDevCompileDone(({ stats }) => {
          if (stats.toJson({
            all: false
          }).name !== "server") {
            (0, import_helpers.onRepack)(distDirectory, runner);
          }
        });
        if (dev.watch) {
          const { watchOptions } = config.server;
          const watcher = (0, import_helpers.startWatcher)({
            pwd,
            distDir: distDirectory,
            apiDir: apiDirectory || import_utils.API_DIR,
            sharedDir: sharedDirectory || import_utils.SHARED_DIR,
            watchOptions,
            server: serverBase
          });
          closeCb.push(watcher.close.bind(watcher));
        }
        closeCb.length > 0 && (nodeServer === null || nodeServer === void 0 ? void 0 : nodeServer.on("close", () => {
          closeCb.forEach((cb) => {
            cb();
          });
        }));
        const before = [];
        const after = [];
        const { setupMiddlewares = [] } = dev;
        if (((_dev_after = dev.after) === null || _dev_after === void 0 ? void 0 : _dev_after.length) || ((_dev_before = dev.before) === null || _dev_before === void 0 ? void 0 : _dev_before.length)) {
          setupMiddlewares.push((middlewares2) => {
            middlewares2.unshift(...dev.before || []);
            middlewares2.push(...dev.after || []);
          });
        }
        setupMiddlewares.forEach((handler) => {
          handler({
            unshift: (...handlers) => before.unshift(...handlers),
            push: (...handlers) => after.push(...handlers)
          }, {
            sockWrite: () => {
            }
          });
        });
        before.forEach((middleware, index) => {
          middlewares.push({
            name: `before-dev-server-${index}`,
            handler: (0, import_node.connectMid2HonoMid)(middleware)
          });
        });
        const mockMiddleware = await (0, import_helpers.getMockMiddleware)(pwd);
        middlewares.push({
          name: "mock-dev",
          handler: mockMiddleware
        });
        builderMiddlewares && middlewares.push({
          name: "rsbuild-dev",
          handler: (0, import_node.connectMid2HonoMid)(builderMiddlewares)
        });
        after.forEach((middleware, index) => {
          middlewares.push({
            name: `after-dev-server-${index}`,
            handler: (0, import_node.connectMid2HonoMid)(middleware)
          });
        });
        middlewares.push({
          name: "init-file-reader",
          handler: (0, import_helpers.initFileReader)()
        });
      }
    };
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  devPlugin
});
