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
let encoder;
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
  const readableStream = new ReadableStream({
    start(controller) {
      controller.enqueue(encodeForWebStream(content));
      controller.close();
    }
  });
  return readableStream;
}
function createRenderStreaming(createReadableStreamFromElement) {
  return async (request, serverRoot, options) => {
    const headersData = parseHeaders(request);
    return run(headersData, async () => {
      const end = time();
      const { runtimeContext, config, resource } = options;
      const onError = createOnError(options.onError);
      const onTiming = createOnTiming(options.onTiming);
      const { htmlTemplate, entryName } = resource;
      const ssrConfig = getSSRConfigByEntry(entryName, config.ssr, config.ssrByEntries);
      const rootElement = wrapRuntimeContextProvider(serverRoot, Object.assign(runtimeContext, {
        ssr: true
      }));
      const stream = await createReadableStreamFromElement(request, rootElement, {
        config,
        htmlTemplate,
        runtimeContext,
        ssrConfig,
        entryName,
        onShellReady() {
          const cost = end();
          onTiming(SSRTimings.RENDER_SHELL, cost);
        },
        onAllReady() {
          const cost = end();
          onTiming(SSRTimings.RENDER_HTML, cost);
        },
        onShellError(error) {
          onError(SSRErrors.RENDER_SHELL, error);
        },
        onError(error) {
          onError(SSRErrors.RENDER_STREAM, error);
        }
      });
      return stream;
    });
  };
}
export {
  ShellChunkStatus,
  createRenderStreaming,
  encodeForWebStream,
  getReadableStreamFromString
};
