"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var createReadableStream_worker_exports = {};
__export(createReadableStream_worker_exports, {
  createReadableStreamFromElement: () => createReadableStreamFromElement
});
module.exports = __toCommonJS(createReadableStream_worker_exports);
var import_isbot = __toESM(require("isbot"));
var import_server = require("react-dom/server");
var import_common = require("../../../common");
var import_constants = require("../../constants");
var import_shared = require("./shared");
var import_template = require("./template");
const createReadableStreamFromElement = async (request, rootElement, options) => {
  let shellChunkStatus = import_shared.ShellChunkStatus.START;
  const chunkVec = [];
  const { htmlTemplate, runtimeContext, config, ssrConfig, entryName } = options;
  const { shellBefore, shellAfter } = await (0, import_template.getTemplates)(htmlTemplate, {
    renderLevel: import_constants.RenderLevel.SERVER_RENDER,
    runtimeContext,
    ssrConfig,
    request,
    config,
    entryName
  });
  try {
    var _options_onShellReady;
    const readableOriginal = await (0, import_server.renderToReadableStream)(rootElement, {
      nonce: config.nonce,
      onError(error) {
        var _options_onError;
        (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, error);
      }
    });
    (_options_onShellReady = options.onShellReady) === null || _options_onShellReady === void 0 ? void 0 : _options_onShellReady.call(options);
    readableOriginal.allReady.then(() => {
      var _options_onAllReady;
      options === null || options === void 0 ? void 0 : (_options_onAllReady = options.onAllReady) === null || _options_onAllReady === void 0 ? void 0 : _options_onAllReady.call(options);
    });
    const isbot = (0, import_isbot.default)(request.headers.get("user-agent"));
    if (isbot) {
      await readableOriginal.allReady;
    }
    const reader = readableOriginal.getReader();
    const stream = new ReadableStream({
      start(controller) {
        async function push() {
          const { done, value } = await reader.read();
          if (done) {
            controller.close();
            return;
          }
          if (shellChunkStatus !== import_shared.ShellChunkStatus.FINISH) {
            const chunk = new TextDecoder().decode(value);
            chunkVec.push(chunk);
            let concatedChunk = chunkVec.join("");
            if (concatedChunk.endsWith(import_common.ESCAPED_SHELL_STREAM_END_MARK)) {
              concatedChunk = concatedChunk.replace(import_common.ESCAPED_SHELL_STREAM_END_MARK, "");
              shellChunkStatus = import_shared.ShellChunkStatus.FINISH;
              controller.enqueue((0, import_shared.encodeForWebStream)(`${shellBefore}${concatedChunk}${shellAfter}`));
            }
          } else {
            controller.enqueue(value);
          }
          push();
        }
        push();
      }
    });
    return stream;
  } catch (e) {
    const fallbackHtml = `${shellBefore}${shellAfter}`;
    const stream = (0, import_shared.getReadableStreamFromString)(fallbackHtml);
    return stream;
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReadableStreamFromElement
});
