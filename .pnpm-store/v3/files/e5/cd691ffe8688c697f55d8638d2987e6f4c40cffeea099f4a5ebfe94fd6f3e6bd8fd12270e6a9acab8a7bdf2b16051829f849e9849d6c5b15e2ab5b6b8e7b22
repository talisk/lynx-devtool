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
var prefetch_exports = {};
__export(prefetch_exports, {
  prefetch: () => prefetch
});
module.exports = __toCommonJS(prefetch_exports);
var import_server = require("@loadable/server");
var import_node = require("@modern-js/runtime-utils/node");
var import_time = require("@modern-js/runtime-utils/time");
var import_request = require("@modern-js/runtime-utils/universal/request");
var import_server2 = require("react-dom/server");
var import_wrapper = require("../../react/wrapper");
var import_tracer = require("../tracer");
const prefetch = async (App, request, options, ssrConfig, { onError, onTiming }) => {
  const headersData = (0, import_request.parseHeaders)(request);
  const { runtimeContext: context, resource } = options;
  const { entryName, loadableStats } = resource;
  return (0, import_node.run)(headersData, async () => {
    var _context_store;
    if (typeof ssrConfig === "boolean" || !ssrConfig.disablePrerender) {
      try {
        const end = (0, import_time.time)();
        if (loadableStats) {
          const extractor = new import_server.ChunkExtractor({
            stats: loadableStats,
            entrypoints: [
              entryName
            ].filter(Boolean)
          });
          (0, import_server2.renderToStaticMarkup)(extractor.collectChunks((0, import_wrapper.wrapRuntimeContextProvider)(App, Object.assign(context, {
            ssr: false
          }))));
        } else {
          (0, import_server2.renderToStaticMarkup)((0, import_wrapper.wrapRuntimeContextProvider)(App, Object.assign(context, {
            ssr: false
          })));
        }
        const cost = end();
        onTiming(import_tracer.SSRTimings.PRERENDER, cost);
      } catch (e) {
        const error = e;
        onError(import_tracer.SSRErrors.PRERENDER, error);
        throw e;
      }
    }
    if (!context.loaderManager.hasPendingLoaders()) {
      return {
        initialData: context.initialData,
        i18nData: context.__i18nData__
      };
    }
    let loadersData = {};
    try {
      const end = (0, import_time.time)();
      loadersData = await context.loaderManager.awaitPendingLoaders();
      const cost = end();
      onTiming(import_tracer.SSRTimings.USE_LOADER, cost);
    } catch (e) {
      onError(import_tracer.SSRErrors.USE_LOADER, e);
      throw e;
    }
    Object.keys(loadersData).forEach((id) => {
      const data = loadersData[id];
      if (data._error) {
        onError(import_tracer.SSRErrors.USE_LOADER, data._error);
        delete data._error;
      }
    });
    return {
      loadersData,
      initialData: context.initialData,
      i18nData: context.__i18nData__,
      // todo: move to plugin state
      storeState: context === null || context === void 0 ? void 0 : (_context_store = context.store) === null || _context_store === void 0 ? void 0 : _context_store.getState()
    };
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  prefetch
});
