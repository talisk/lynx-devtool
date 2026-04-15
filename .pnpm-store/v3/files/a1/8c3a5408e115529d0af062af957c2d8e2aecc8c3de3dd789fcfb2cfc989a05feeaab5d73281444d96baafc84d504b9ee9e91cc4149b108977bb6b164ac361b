import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import checkIsBot from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { ESCAPED_SHELL_STREAM_END_MARK } from "../../../common";
import { RenderLevel } from "../../constants";
import { ShellChunkStatus, encodeForWebStream, getReadableStreamFromString } from "./shared";
import { getTemplates } from "./template";
var createReadableStreamFromElement = function() {
  var _ref = _async_to_generator(function(request, rootElement, options) {
    var shellChunkStatus, chunkVec, htmlTemplate, runtimeContext, config, ssrConfig, entryName, _ref2, shellBefore, shellAfter, _options_onShellReady, readableOriginal, isbot, reader, stream, e, fallbackHtml, stream1;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          shellChunkStatus = ShellChunkStatus.START;
          chunkVec = [];
          htmlTemplate = options.htmlTemplate, runtimeContext = options.runtimeContext, config = options.config, ssrConfig = options.ssrConfig, entryName = options.entryName;
          return [
            4,
            getTemplates(htmlTemplate, {
              renderLevel: RenderLevel.SERVER_RENDER,
              runtimeContext,
              ssrConfig,
              request,
              config,
              entryName
            })
          ];
        case 1:
          _ref2 = _state.sent(), shellBefore = _ref2.shellBefore, shellAfter = _ref2.shellAfter;
          _state.label = 2;
        case 2:
          _state.trys.push([
            2,
            6,
            ,
            7
          ]);
          return [
            4,
            renderToReadableStream(rootElement, {
              nonce: config.nonce,
              onError: function onError(error) {
                var _options_onError;
                (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, error);
              }
            })
          ];
        case 3:
          readableOriginal = _state.sent();
          (_options_onShellReady = options.onShellReady) === null || _options_onShellReady === void 0 ? void 0 : _options_onShellReady.call(options);
          readableOriginal.allReady.then(function() {
            var _options_onAllReady;
            options === null || options === void 0 ? void 0 : (_options_onAllReady = options.onAllReady) === null || _options_onAllReady === void 0 ? void 0 : _options_onAllReady.call(options);
          });
          isbot = checkIsBot(request.headers.get("user-agent"));
          if (!isbot)
            return [
              3,
              5
            ];
          return [
            4,
            readableOriginal.allReady
          ];
        case 4:
          _state.sent();
          _state.label = 5;
        case 5:
          reader = readableOriginal.getReader();
          stream = new ReadableStream({
            start: function start(controller) {
              function push() {
                return _push.apply(this, arguments);
              }
              function _push() {
                _push = _async_to_generator(function() {
                  var _ref3, done, value, chunk, concatedChunk;
                  return _ts_generator(this, function(_state2) {
                    switch (_state2.label) {
                      case 0:
                        return [
                          4,
                          reader.read()
                        ];
                      case 1:
                        _ref3 = _state2.sent(), done = _ref3.done, value = _ref3.value;
                        if (done) {
                          controller.close();
                          return [
                            2
                          ];
                        }
                        if (shellChunkStatus !== ShellChunkStatus.FINISH) {
                          chunk = new TextDecoder().decode(value);
                          chunkVec.push(chunk);
                          concatedChunk = chunkVec.join("");
                          if (concatedChunk.endsWith(ESCAPED_SHELL_STREAM_END_MARK)) {
                            concatedChunk = concatedChunk.replace(ESCAPED_SHELL_STREAM_END_MARK, "");
                            shellChunkStatus = ShellChunkStatus.FINISH;
                            controller.enqueue(encodeForWebStream("".concat(shellBefore).concat(concatedChunk).concat(shellAfter)));
                          }
                        } else {
                          controller.enqueue(value);
                        }
                        push();
                        return [
                          2
                        ];
                    }
                  });
                });
                return _push.apply(this, arguments);
              }
              push();
            }
          });
          return [
            2,
            stream
          ];
        case 6:
          e = _state.sent();
          fallbackHtml = "".concat(shellBefore).concat(shellAfter);
          stream1 = getReadableStreamFromString(fallbackHtml);
          return [
            2,
            stream1
          ];
        case 7:
          return [
            2
          ];
      }
    });
  });
  return function createReadableStreamFromElement2(request, rootElement, options) {
    return _ref.apply(this, arguments);
  };
}();
export {
  createReadableStreamFromElement
};
