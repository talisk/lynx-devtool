import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _call_super } from "@swc/helpers/_/_call_super";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _inherits } from "@swc/helpers/_/_inherits";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import * as Event from "events";
import * as path from "path";
import { WatchChangeType, logger, watch } from "@modern-js/utils";
import { build } from "./build";
import { CompilerErrorResult } from "./compilerErrorResult";
var BuildWatchEvent = {
  firstCompiler: "first-compiler",
  compiling: "compiling",
  watchingCompiler: "watching-compiler"
};
var BuildWatchEmitter = /* @__PURE__ */ function(_Event_EventEmitter) {
  "use strict";
  _inherits(BuildWatchEmitter2, _Event_EventEmitter);
  function BuildWatchEmitter2() {
    _class_call_check(this, BuildWatchEmitter2);
    return _call_super(this, BuildWatchEmitter2, arguments);
  }
  var _proto = BuildWatchEmitter2.prototype;
  _proto.setInitFn = function setInitFn(fn) {
    this._initFn = fn;
  };
  _proto.watch = function watch2() {
    var _this = this;
    return _async_to_generator(function() {
      return _ts_generator(this, function(_state) {
        if (typeof _this._initFn === "function") {
          return [
            2,
            _this._initFn(_this)
          ];
        }
        return [
          2,
          null
        ];
      });
    })();
  };
  return BuildWatchEmitter2;
}(Event.EventEmitter);
var runBuildWatch = function() {
  var _ref = _async_to_generator(function(option) {
    var babelConfig, emitter, errorResult, watchDir, distDir, quiet, firstBuildResult, code;
    var _arguments = arguments;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          babelConfig = _arguments.length > 1 && _arguments[1] !== void 0 ? _arguments[1] : {}, emitter = _arguments.length > 2 ? _arguments[2] : void 0;
          emitter.emit(BuildWatchEvent.compiling);
          errorResult = new CompilerErrorResult();
          watchDir = option.watchDir;
          distDir = option.distDir, quiet = option.quiet;
          return [
            4,
            build(option, babelConfig)
          ];
        case 1:
          firstBuildResult = _state.sent();
          code = firstBuildResult.code;
          if (code === 1) {
            errorResult.init(firstBuildResult);
            emitter.emit(BuildWatchEvent.firstCompiler, errorResult.value);
          } else {
            emitter.emit(BuildWatchEvent.firstCompiler, firstBuildResult);
          }
          return [
            2,
            watch("".concat(watchDir, "/**/*.{js,jsx,ts,tsx}"), function() {
              var _ref2 = _async_to_generator(function(param) {
                var changeType, changedFilePath, removeFiles, result, result1;
                return _ts_generator(this, function(_state2) {
                  switch (_state2.label) {
                    case 0:
                      changeType = param.changeType, changedFilePath = param.changedFilePath;
                      emitter.emit(BuildWatchEvent.compiling);
                      if (changeType === WatchChangeType.UNLINK) {
                        removeFiles = [
                          path.normalize("./".concat(distDir, "/").concat(path.relative(watchDir, changedFilePath)))
                        ];
                        if (!quiet) {
                          logger.info("remove file: ".concat(removeFiles.join(",")));
                        }
                        result = {
                          code: 0,
                          message: "remove file: ".concat(removeFiles.join(",")),
                          removeFiles
                        };
                        emitter.emit(BuildWatchEvent.watchingCompiler, result);
                        return [
                          2
                        ];
                      }
                      return [
                        4,
                        build(_object_spread_props(_object_spread({}, option), {
                          filenames: [
                            changedFilePath
                          ]
                        }), babelConfig)
                      ];
                    case 1:
                      result1 = _state2.sent();
                      if (result1.code === 1) {
                        errorResult.update(result1.messageDetails || []);
                        emitter.emit(BuildWatchEvent.watchingCompiler, errorResult.value);
                        !quiet && logger.info(errorResult.value.message);
                      } else {
                        errorResult.removeByFileName(changedFilePath);
                        if (errorResult.checkExistError()) {
                          emitter.emit(BuildWatchEvent.watchingCompiler, _object_spread_props(_object_spread({}, errorResult.value), {
                            virtualDists: result1.virtualDists
                          }));
                          !quiet && logger.info(errorResult.value.message);
                        } else {
                          emitter.emit(BuildWatchEvent.watchingCompiler, result1);
                          !quiet && logger.info(result1.message);
                        }
                      }
                      return [
                        2
                      ];
                  }
                });
              });
              return function(_) {
                return _ref2.apply(this, arguments);
              };
            }(), [
              "".concat(watchDir, "/**/*.d.ts")
            ])
          ];
      }
    });
  });
  return function runBuildWatch2(option) {
    return _ref.apply(this, arguments);
  };
}();
var buildWatch = function(option) {
  var babelConfig = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var buildWatchEmitter = new BuildWatchEmitter();
  buildWatchEmitter.setInitFn(runBuildWatch.bind(null, option, babelConfig));
  return buildWatchEmitter;
};
export {
  BuildWatchEmitter,
  BuildWatchEvent,
  buildWatch,
  runBuildWatch
};
