import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { ChunkExtractor } from "@loadable/server";
import { run } from "@modern-js/runtime-utils/node";
import { time } from "@modern-js/runtime-utils/time";
import { parseHeaders } from "@modern-js/runtime-utils/universal/request";
import { renderToStaticMarkup } from "react-dom/server";
import { wrapRuntimeContextProvider } from "../../react/wrapper";
import { SSRErrors, SSRTimings } from "../tracer";
var prefetch = function() {
  var _ref = _async_to_generator(function(App, request, options, ssrConfig, param) {
    var onError, onTiming, headersData, context, resource, entryName, loadableStats;
    return _ts_generator(this, function(_state) {
      onError = param.onError, onTiming = param.onTiming;
      headersData = parseHeaders(request);
      context = options.runtimeContext, resource = options.resource;
      entryName = resource.entryName, loadableStats = resource.loadableStats;
      return [
        2,
        run(headersData, /* @__PURE__ */ _async_to_generator(function() {
          var _context_store, end, extractor, cost, error, loadersData, end1, cost1, e;
          return _ts_generator(this, function(_state2) {
            switch (_state2.label) {
              case 0:
                if (typeof ssrConfig === "boolean" || !ssrConfig.disablePrerender) {
                  try {
                    end = time();
                    if (loadableStats) {
                      extractor = new ChunkExtractor({
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
                    cost = end();
                    onTiming(SSRTimings.PRERENDER, cost);
                  } catch (e2) {
                    error = e2;
                    onError(SSRErrors.PRERENDER, error);
                    throw e2;
                  }
                }
                if (!context.loaderManager.hasPendingLoaders()) {
                  return [
                    2,
                    {
                      initialData: context.initialData,
                      i18nData: context.__i18nData__
                    }
                  ];
                }
                loadersData = {};
                _state2.label = 1;
              case 1:
                _state2.trys.push([
                  1,
                  3,
                  ,
                  4
                ]);
                end1 = time();
                return [
                  4,
                  context.loaderManager.awaitPendingLoaders()
                ];
              case 2:
                loadersData = _state2.sent();
                cost1 = end1();
                onTiming(SSRTimings.USE_LOADER, cost1);
                return [
                  3,
                  4
                ];
              case 3:
                e = _state2.sent();
                onError(SSRErrors.USE_LOADER, e);
                throw e;
              case 4:
                Object.keys(loadersData).forEach(function(id) {
                  var data = loadersData[id];
                  if (data._error) {
                    onError(SSRErrors.USE_LOADER, data._error);
                    delete data._error;
                  }
                });
                return [
                  2,
                  {
                    loadersData,
                    initialData: context.initialData,
                    i18nData: context.__i18nData__,
                    // todo: move to plugin state
                    storeState: context === null || context === void 0 ? void 0 : (_context_store = context.store) === null || _context_store === void 0 ? void 0 : _context_store.getState()
                  }
                ];
            }
          });
        }))
      ];
    });
  });
  return function prefetch2(App, request, options, ssrConfig, _) {
    return _ref.apply(this, arguments);
  };
}();
export {
  prefetch
};
