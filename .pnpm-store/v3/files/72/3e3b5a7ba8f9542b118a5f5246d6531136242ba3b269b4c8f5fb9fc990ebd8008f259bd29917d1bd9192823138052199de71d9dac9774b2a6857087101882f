import { Transform } from "stream";
import { createReadableStreamFromReadable } from "@modern-js/runtime-utils/node";
import checkIsBot from "isbot";
import { ServerStyleSheet } from "styled-components";
import { ESCAPED_SHELL_STREAM_END_MARK } from "../../../common";
import { RenderLevel } from "../../constants";
import { ShellChunkStatus, getReadableStreamFromString } from "./shared";
import { getTemplates } from "./template";
const createReadableStreamFromElement = async (request, rootElement, options) => {
  const { renderToPipeableStream } = await import("react-dom/server");
  const { runtimeContext, htmlTemplate, config, ssrConfig, entryName } = options;
  let shellChunkStatus = ShellChunkStatus.START;
  let renderLevel = RenderLevel.SERVER_RENDER;
  const forceStream2String = Boolean(process.env.MODERN_JS_STREAM_TO_STRING);
  const isbot = checkIsBot(request.headers.get("user-agent"));
  const onReady = isbot || forceStream2String ? "onAllReady" : "onShellReady";
  const sheet = new ServerStyleSheet();
  const chunkVec = [];
  const root = forceStream2String ? sheet.collectStyles(rootElement) : rootElement;
  return new Promise((resolve) => {
    const { pipe } = renderToPipeableStream(root, {
      nonce: config.nonce,
      [onReady]() {
        var _options_onReady;
        const styledComponentsStyleTags = forceStream2String ? sheet.getStyleTags() : "";
        (_options_onReady = options[onReady]) === null || _options_onReady === void 0 ? void 0 : _options_onReady.call(options);
        getTemplates(htmlTemplate, {
          request,
          ssrConfig,
          renderLevel,
          runtimeContext,
          config,
          entryName,
          styledComponentsStyleTags
        }).then(({ shellAfter, shellBefore }) => {
          const body = new Transform({
            transform(chunk, _encoding, callback) {
              try {
                if (shellChunkStatus !== ShellChunkStatus.FINISH) {
                  chunkVec.push(chunk.toString());
                  let concatedChunk = chunkVec.join("");
                  if (concatedChunk.includes(ESCAPED_SHELL_STREAM_END_MARK)) {
                    concatedChunk = concatedChunk.replace(ESCAPED_SHELL_STREAM_END_MARK, "");
                    shellChunkStatus = ShellChunkStatus.FINISH;
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
          const stream = createReadableStreamFromReadable(body);
          resolve(stream);
          pipe(body);
        });
      },
      onShellError(error) {
        renderLevel = RenderLevel.CLIENT_RENDER;
        getTemplates(htmlTemplate, {
          request,
          ssrConfig,
          renderLevel,
          runtimeContext,
          entryName,
          config
        }).then(({ shellAfter, shellBefore }) => {
          var _options_onShellError;
          const fallbackHtml = `${shellBefore}${shellAfter}`;
          const readableStream = getReadableStreamFromString(fallbackHtml);
          resolve(readableStream);
          options === null || options === void 0 ? void 0 : (_options_onShellError = options.onShellError) === null || _options_onShellError === void 0 ? void 0 : _options_onShellError.call(options, error);
        });
      },
      onError(error) {
        var _options_onError;
        renderLevel = RenderLevel.CLIENT_RENDER;
        options === null || options === void 0 ? void 0 : (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, error);
      }
    });
  });
};
export {
  createReadableStreamFromElement
};
