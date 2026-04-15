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
var shared_exports = {};
__export(shared_exports, {
  ShellChunkStatus: () => ShellChunkStatus,
  createRenderStreaming: () => createRenderStreaming,
  encodeForWebStream: () => encodeForWebStream,
  getReadableStreamFromString: () => getReadableStreamFromString
});
module.exports = __toCommonJS(shared_exports);
var import_node = require("@modern-js/runtime-utils/node");
var import_time = require("@modern-js/runtime-utils/time");
var import_request = require("@modern-js/runtime-utils/universal/request");
var import_wrapper = require("../../react/wrapper");
var import_tracer = require("../tracer");
var import_utils = require("../utils");
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
    const headersData = (0, import_request.parseHeaders)(request);
    return (0, import_node.run)(headersData, async () => {
      const end = (0, import_time.time)();
      const { runtimeContext, config, resource } = options;
      const onError = (0, import_tracer.createOnError)(options.onError);
      const onTiming = (0, import_tracer.createOnTiming)(options.onTiming);
      const { htmlTemplate, entryName } = resource;
      const ssrConfig = (0, import_utils.getSSRConfigByEntry)(entryName, config.ssr, config.ssrByEntries);
      const rootElement = (0, import_wrapper.wrapRuntimeContextProvider)(serverRoot, Object.assign(runtimeContext, {
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
          onTiming(import_tracer.SSRTimings.RENDER_SHELL, cost);
        },
        onAllReady() {
          const cost = end();
          onTiming(import_tracer.SSRTimings.RENDER_HTML, cost);
        },
        onShellError(error) {
          onError(import_tracer.SSRErrors.RENDER_SHELL, error);
        },
        onError(error) {
          onError(import_tracer.SSRErrors.RENDER_STREAM, error);
        }
      });
      return stream;
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ShellChunkStatus,
  createRenderStreaming,
  encodeForWebStream,
  getReadableStreamFromString
});
