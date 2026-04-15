import { ChunkExtractor } from "@loadable/server";
import { run } from "@modern-js/runtime-utils/node";
import { time } from "@modern-js/runtime-utils/time";
import { parseHeaders } from "@modern-js/runtime-utils/universal/request";
import { renderToStaticMarkup } from "react-dom/server";
import { wrapRuntimeContextProvider } from "../../react/wrapper";
import { SSRErrors, SSRTimings } from "../tracer";
const prefetch = async (App, request, options, ssrConfig, { onError, onTiming }) => {
  const headersData = parseHeaders(request);
  const { runtimeContext: context, resource } = options;
  const { entryName, loadableStats } = resource;
  return run(headersData, async () => {
    var _context_store;
    if (typeof ssrConfig === "boolean" || !ssrConfig.disablePrerender) {
      try {
        const end = time();
        if (loadableStats) {
          const extractor = new ChunkExtractor({
            stats: loadableStats,
            entrypoints: [
              entryName
            ].filter(Boolean)
          });
          renderToStaticMarkup(extractor.collectChunks(wrapRuntimeContextProvider(App, Object.assign(context, {
            ssr: false
          }))));
        } else {
          renderToStaticMarkup(wrapRuntimeContextProvider(App, Object.assign(context, {
            ssr: false
          })));
        }
        const cost = end();
        onTiming(SSRTimings.PRERENDER, cost);
      } catch (e) {
        const error = e;
        onError(SSRErrors.PRERENDER, error);
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
      const end = time();
      loadersData = await context.loaderManager.awaitPendingLoaders();
      const cost = end();
      onTiming(SSRTimings.USE_LOADER, cost);
    } catch (e) {
      onError(SSRErrors.USE_LOADER, e);
      throw e;
    }
    Object.keys(loadersData).forEach((id) => {
      const data = loadersData[id];
      if (data._error) {
        onError(SSRErrors.USE_LOADER, data._error);
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
export {
  prefetch
};
