import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { run } from "@modern-js/runtime-utils/node";
import { time } from "@modern-js/runtime-utils/time";
import { parseHeaders } from "@modern-js/runtime-utils/universal/request";
import { wrapRuntimeContextProvider } from "../../react/wrapper";
import { SSRErrors, SSRTimings, createOnError, createOnTiming } from "../tracer";
import { getSSRConfigByEntry } from "../utils";
var ShellChunkStatus;
(function(ShellChunkStatus2) {
  ShellChunkStatus2[ShellChunkStatus2["START"] = 0] = "START";
  ShellChunkStatus2[ShellChunkStatus2["FINISH"] = 1] = "FINISH";
})(ShellChunkStatus || (ShellChunkStatus = {}));
var encoder;
function encodeForWebStream(thing) {
  if (!encoder) {
    encoder = new TextEncoder();
  }
  if (typeof thing === "string") {
    return encoder.encode(thing);
  }
  return thing;
}
function getReadableStreamFromString(content) {
  var readableStream = new ReadableStream({
    start: function start(controller) {
      controller.enqueue(encodeForWebStream(content));
      controller.close();
    }
  });
  return readableStream;
}
function createRenderStreaming(createReadableStreamFromElement) {
  return function() {
    var _ref = _async_to_generator(function(request, serverRoot, options) {
      var headersData;
      return _ts_generator(this, function(_state) {
        headersData = parseHeaders(request);
        return [
          2,
          run(headersData, /* @__PURE__ */ _async_to_generator(function() {
            var end, runtimeContext, config, resource, onError, onTiming, htmlTemplate, entryName, ssrConfig, rootElement, stream;
            return _ts_generator(this, function(_state2) {
              switch (_state2.label) {
                case 0:
                  end = time();
                  runtimeContext = options.runtimeContext, config = options.config, resource = options.resource;
                  onError = createOnError(options.onError);
                  onTiming = createOnTiming(options.onTiming);
                  htmlTemplate = resource.htmlTemplate, entryName = resource.entryName;
                  ssrConfig = getSSRConfigByEntry(entryName, config.ssr, config.ssrByEntries);
                  rootElement = wrapRuntimeContextProvider(serverRoot, Object.assign(runtimeContext, {
                    ssr: true
                  }));
                  return [
                    4,
                    createReadableStreamFromElement(request, rootElement, {
                      config,
                      htmlTemplate,
                      runtimeContext,
                      ssrConfig,
                      entryName,
                      onShellReady: function onShellReady() {
                        var cost = end();
                        onTiming(SSRTimings.RENDER_SHELL, cost);
                      },
                      onAllReady: function onAllReady() {
                        var cost = end();
                        onTiming(SSRTimings.RENDER_HTML, cost);
                      },
                      onShellError: function onShellError(error) {
                        onError(SSRErrors.RENDER_SHELL, error);
                      },
                      onError: function onError1(error) {
                        onError(SSRErrors.RENDER_STREAM, error);
                      }
                    })
                  ];
                case 1:
                  stream = _state2.sent();
                  return [
                    2,
                    stream
                  ];
              }
            });
          }))
        ];
      });
    });
    return function(request, serverRoot, options) {
      return _ref.apply(this, arguments);
    };
  }();
}
export {
  ShellChunkStatus,
  createRenderStreaming,
  encodeForWebStream,
  getReadableStreamFromString
};
