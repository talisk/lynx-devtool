import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { Transform } from "stream";
import { createReadableStreamFromReadable } from "@modern-js/runtime-utils/node";
import checkIsBot from "isbot";
import { ServerStyleSheet } from "styled-components";
import { ESCAPED_SHELL_STREAM_END_MARK } from "../../../common";
import { RenderLevel } from "../../constants";
import { ShellChunkStatus, getReadableStreamFromString } from "./shared";
import { getTemplates } from "./template";
var createReadableStreamFromElement = function() {
  var _ref = _async_to_generator(function(request, rootElement, options) {
    var renderToPipeableStream, runtimeContext, htmlTemplate, config, ssrConfig, entryName, shellChunkStatus, renderLevel, forceStream2String, isbot, onReady, sheet, chunkVec, root;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            import("react-dom/server")
          ];
        case 1:
          renderToPipeableStream = _state.sent().renderToPipeableStream;
          runtimeContext = options.runtimeContext, htmlTemplate = options.htmlTemplate, config = options.config, ssrConfig = options.ssrConfig, entryName = options.entryName;
          shellChunkStatus = ShellChunkStatus.START;
          renderLevel = RenderLevel.SERVER_RENDER;
          forceStream2String = Boolean(process.env.MODERN_JS_STREAM_TO_STRING);
          isbot = checkIsBot(request.headers.get("user-agent"));
          onReady = isbot || forceStream2String ? "onAllReady" : "onShellReady";
          sheet = new ServerStyleSheet();
          chunkVec = [];
          root = forceStream2String ? sheet.collectStyles(rootElement) : rootElement;
          return [
            2,
            new Promise(function(resolve) {
              var _obj;
              var pipe = renderToPipeableStream(root, (_obj = {
                nonce: config.nonce
              }, _define_property(_obj, onReady, function() {
                var _options_onReady;
                var styledComponentsStyleTags = forceStream2String ? sheet.getStyleTags() : "";
                (_options_onReady = options[onReady]) === null || _options_onReady === void 0 ? void 0 : _options_onReady.call(options);
                getTemplates(htmlTemplate, {
                  request,
                  ssrConfig,
                  renderLevel,
                  runtimeContext,
                  config,
                  entryName,
                  styledComponentsStyleTags
                }).then(function(param) {
                  var shellAfter = param.shellAfter, shellBefore = param.shellBefore;
                  var body = new Transform({
                    transform: function transform(chunk, _encoding, callback) {
                      try {
                        if (shellChunkStatus !== ShellChunkStatus.FINISH) {
                          chunkVec.push(chunk.toString());
                          var concatedChunk = chunkVec.join("");
                          if (concatedChunk.includes(ESCAPED_SHELL_STREAM_END_MARK)) {
                            concatedChunk = concatedChunk.replace(ESCAPED_SHELL_STREAM_END_MARK, "");
                            shellChunkStatus = ShellChunkStatus.FINISH;
                            this.push("".concat(shellBefore).concat(concatedChunk).concat(shellAfter));
                          }
                        } else {
                          this.push(chunk);
                        }
                        callback();
                      } catch (e) {
                        if (_instanceof(e, Error)) {
                          callback(e);
                        } else {
                          callback(new Error("Received unkown error when streaming"));
                        }
                      }
                    }
                  });
                  var stream = createReadableStreamFromReadable(body);
                  resolve(stream);
                  pipe(body);
                });
              }), _define_property(_obj, "onShellError", function onShellError(error) {
                renderLevel = RenderLevel.CLIENT_RENDER;
                getTemplates(htmlTemplate, {
                  request,
                  ssrConfig,
                  renderLevel,
                  runtimeContext,
                  entryName,
                  config
                }).then(function(param) {
                  var shellAfter = param.shellAfter, shellBefore = param.shellBefore;
                  var _options_onShellError;
                  var fallbackHtml = "".concat(shellBefore).concat(shellAfter);
                  var readableStream = getReadableStreamFromString(fallbackHtml);
                  resolve(readableStream);
                  options === null || options === void 0 ? void 0 : (_options_onShellError = options.onShellError) === null || _options_onShellError === void 0 ? void 0 : _options_onShellError.call(options, error);
                });
              }), _define_property(_obj, "onError", function onError(error) {
                var _options_onError;
                renderLevel = RenderLevel.CLIENT_RENDER;
                options === null || options === void 0 ? void 0 : (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, error);
              }), _obj)).pipe;
            })
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
