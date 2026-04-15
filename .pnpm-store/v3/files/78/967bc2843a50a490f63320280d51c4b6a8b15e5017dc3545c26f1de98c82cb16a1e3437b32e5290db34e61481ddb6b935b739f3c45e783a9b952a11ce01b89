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
var inject_exports = {};
__export(inject_exports, {
  getRenderHandler: () => getRenderHandler,
  injectRenderHandlerPlugin: () => injectRenderHandlerPlugin
});
module.exports = __toCommonJS(inject_exports);
var import_render = require("./render");
const injectRenderHandlerPlugin = ({ staticGenerate, cacheConfig }) => ({
  name: "@modern-js/plugin-inject-render",
  setup(api) {
    return {
      async prepare() {
        var _config_render;
        const { distDirectory: pwd, routes, metaName } = api.useAppContext();
        const config = api.useConfigContext();
        const hookRunner = api.useHookRunners();
        if (!routes) {
          return;
        }
        const onFallback = async (reason, utils, error) => {
          await hookRunner.fallback({
            reason,
            ...utils,
            error
          });
        };
        const getRenderHandlerOptions = {
          pwd,
          routes,
          config,
          metaName,
          cacheConfig: ((_config_render = config.render) === null || _config_render === void 0 ? void 0 : _config_render.cache) || cacheConfig,
          staticGenerate,
          onFallback
        };
        const render = await getRenderHandler(getRenderHandlerOptions);
        api.setAppContext({
          ...api.useAppContext(),
          render,
          getRenderOptions: getRenderHandlerOptions
        });
      }
    };
  }
});
async function getRenderHandler({ pwd, routes, config, cacheConfig, metaName, staticGenerate, onFallback }) {
  var _config_server, _config_security;
  const ssrConfig = (_config_server = config.server) === null || _config_server === void 0 ? void 0 : _config_server.ssr;
  const forceCSR = typeof ssrConfig === "object" ? ssrConfig.forceCSR : false;
  const render = (0, import_render.createRender)({
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
  return render;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getRenderHandler,
  injectRenderHandlerPlugin
});
