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
var createReadableStream_exports = {};
__export(createReadableStream_exports, {
  createReadableStreamFromElement: () => createReadableStreamFromElement
});
module.exports = __toCommonJS(createReadableStream_exports);
var import_stream = require("stream");
var import_node = require("@modern-js/runtime-utils/node");
var import_isbot = __toESM(require("isbot"));
var import_styled_components = require("styled-components");
var import_common = require("../../../common");
var import_constants = require("../../constants");
var import_shared = require("./shared");
var import_template = require("./template");
const createReadableStreamFromElement = async (request, rootElement, options) => {
  const { renderToPipeableStream } = await Promise.resolve().then(() => __toESM(require("react-dom/server")));
  const { runtimeContext, htmlTemplate, config, ssrConfig, entryName } = options;
  let shellChunkStatus = import_shared.ShellChunkStatus.START;
  let renderLevel = import_constants.RenderLevel.SERVER_RENDER;
  const forceStream2String = Boolean(process.env.MODERN_JS_STREAM_TO_STRING);
  const isbot = (0, import_isbot.default)(request.headers.get("user-agent"));
  const onReady = isbot || forceStream2String ? "onAllReady" : "onShellReady";
  const sheet = new import_styled_components.ServerStyleSheet();
  const chunkVec = [];
  const root = forceStream2String ? sheet.collectStyles(rootElement) : rootElement;
  return new Promise((resolve) => {
    const { pipe } = renderToPipeableStream(root, {
      nonce: config.nonce,
      [onReady]() {
        var _options_onReady;
        const styledComponentsStyleTags = forceStream2String ? sheet.getStyleTags() : "";
        (_options_onReady = options[onReady]) === null || _options_onReady === void 0 ? void 0 : _options_onReady.call(options);
        (0, import_template.getTemplates)(htmlTemplate, {
          request,
          ssrConfig,
          renderLevel,
          runtimeContext,
          config,
          entryName,
          styledComponentsStyleTags
        }).then(({ shellAfter, shellBefore }) => {
          const body = new import_stream.Transform({
            transform(chunk, _encoding, callback) {
              try {
                if (shellChunkStatus !== import_shared.ShellChunkStatus.FINISH) {
                  chunkVec.push(chunk.toString());
                  let concatedChunk = chunkVec.join("");
                  if (concatedChunk.includes(import_common.ESCAPED_SHELL_STREAM_END_MARK)) {
                    concatedChunk = concatedChunk.replace(import_common.ESCAPED_SHELL_STREAM_END_MARK, "");
                    shellChunkStatus = import_shared.ShellChunkStatus.FINISH;
                    this.push(`${shellBefore}${concatedChunk}${shellAfter}`);
                  }
                } else {
                  this.push(chunk);
                }
                callback();
              } catch (e) {
                if (e instanceof Error) {
                  callback(e);
                } else {
                  callback(new Error("Received unkown error when streaming"));
                }
              }
            }
          });
          const stream = (0, import_node.createReadableStreamFromReadable)(body);
          resolve(stream);
          pipe(body);
        });
      },
      onShellError(error) {
        renderLevel = import_constants.RenderLevel.CLIENT_RENDER;
        (0, import_template.getTemplates)(htmlTemplate, {
          request,
          ssrConfig,
          renderLevel,
          runtimeContext,
          entryName,
          config
        }).then(({ shellAfter, shellBefore }) => {
          var _options_onShellError;
          const fallbackHtml = `${shellBefore}${shellAfter}`;
          const readableStream = (0, import_shared.getReadableStreamFromString)(fallbackHtml);
          resolve(readableStream);
          options === null || options === void 0 ? void 0 : (_options_onShellError = options.onShellError) === null || _options_onShellError === void 0 ? void 0 : _options_onShellError.call(options, error);
        });
      },
      onError(error) {
        var _options_onError;
        renderLevel = import_constants.RenderLevel.CLIENT_RENDER;
        options === null || options === void 0 ? void 0 : (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, error);
      }
    });
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createReadableStreamFromElement
});
