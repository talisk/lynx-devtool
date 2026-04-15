import { connectMid2HonoMid } from "@modern-js/server-core/node";
import { API_DIR, SHARED_DIR } from "@modern-js/utils";
import { getDevOptions, getMockMiddleware, initFileReader, onRepack, startWatcher } from "./helpers";
const devPlugin = (options) => ({
  name: "@modern-js/plugin-dev",
  setup(api) {
    const { config, pwd, builder, builderDevServer } = options;
    const closeCb = [];
    const dev = getDevOptions(options);
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
            onRepack(distDirectory, runner);
          }
        });
        if (dev.watch) {
          const { watchOptions } = config.server;
          const watcher = startWatcher({
            pwd,
            distDir: distDirectory,
            apiDir: apiDirectory || API_DIR,
            sharedDir: sharedDirectory || SHARED_DIR,
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
            handler: connectMid2HonoMid(middleware)
          });
        });
        const mockMiddleware = await getMockMiddleware(pwd);
        middlewares.push({
          name: "mock-dev",
          handler: mockMiddleware
        });
        builderMiddlewares && middlewares.push({
          name: "rsbuild-dev",
          handler: connectMid2HonoMid(builderMiddlewares)
        });
        after.forEach((middleware, index) => {
          middlewares.push({
            name: `after-dev-server-${index}`,
            handler: connectMid2HonoMid(middleware)
          });
        });
        middlewares.push({
          name: "init-file-reader",
          handler: initFileReader()
        });
      }
    };
  }
});
export {
  devPlugin
};
