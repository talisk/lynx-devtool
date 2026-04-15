import checkIsBot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ESCAPED_SHELL_STREAM_END_MARK } from "../../../common";
import { RenderLevel } from "../../constants";
import { ShellChunkStatus, encodeForWebStream, getReadableStreamFromString } from "./shared";
import { getTemplates } from "./template";
const createReadableStreamFromElement = async (request, rootElement, options) => {
  let shellChunkStatus = ShellChunkStatus.START;
  const chunkVec = [];
  const { htmlTemplate, runtimeContext, config, ssrConfig, entryName } = options;
  const { shellBefore, shellAfter } = await getTemplates(htmlTemplate, {
    renderLevel: RenderLevel.SERVER_RENDER,
    runtimeContext,
    ssrConfig,
    request,
    config,
    entryName
  });
  try {
    var _options_onShellReady;
    const readableOriginal = await renderToReadableStream(rootElement, {
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
    const isbot = checkIsBot(request.headers.get("user-agent"));
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
          if (shellChunkStatus !== ShellChunkStatus.FINISH) {
            const chunk = new TextDecoder().decode(value);
            chunkVec.push(chunk);
            let concatedChunk = chunkVec.join("");
            if (concatedChunk.endsWith(ESCAPED_SHELL_STREAM_END_MARK)) {
              concatedChunk = concatedChunk.replace(ESCAPED_SHELL_STREAM_END_MARK, "");
              shellChunkStatus = ShellChunkStatus.FINISH;
              controller.enqueue(encodeForWebStream(`${shellBefore}${concatedChunk}${shellAfter}`));
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
    const stream = getReadableStreamFromString(fallbackHtml);
    return stream;
  }
};
export {
  createReadableStreamFromElement
};
