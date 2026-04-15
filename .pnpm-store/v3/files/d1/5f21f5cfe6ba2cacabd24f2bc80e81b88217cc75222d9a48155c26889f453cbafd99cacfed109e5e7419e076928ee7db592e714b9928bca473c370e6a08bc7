import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import path from "node:path";
import { AGGRED_DIR } from "@modern-js/server-core";
import { connectMid2HonoMid } from "@modern-js/server-core/node";
import { fs } from "@modern-js/utils";
import { match } from "path-to-regexp";
var mockAPIs = [];
var mockConfig;
var parseKey = function(key) {
  var _blank = " ";
  var splitted = key.split(_blank).filter(Boolean);
  if (splitted.length > 1) {
    var _splitted = _sliced_to_array(splitted, 2), method = _splitted[0], pathname = _splitted[1];
    return {
      method: method.toLowerCase(),
      path: pathname
    };
  }
  return {
    method: "get",
    path: key
  };
};
var getMockModule = function() {
  var _ref = _async_to_generator(function(pwd) {
    var exts, mockFilePath, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, ext, maybeMatch, err, _ref2, mockHandlers, config, enable;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          exts = [
            ".ts",
            ".js"
          ];
          mockFilePath = "";
          _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
          _state.label = 1;
        case 1:
          _state.trys.push([
            1,
            6,
            7,
            8
          ]);
          _iterator = exts[Symbol.iterator]();
          _state.label = 2;
        case 2:
          if (!!(_iteratorNormalCompletion = (_step = _iterator.next()).done))
            return [
              3,
              5
            ];
          ext = _step.value;
          maybeMatch = path.join(pwd, "".concat(AGGRED_DIR.mock, "/index").concat(ext));
          return [
            4,
            fs.pathExists(maybeMatch)
          ];
        case 3:
          if (_state.sent()) {
            mockFilePath = maybeMatch;
            return [
              3,
              5
            ];
          }
          _state.label = 4;
        case 4:
          _iteratorNormalCompletion = true;
          return [
            3,
            2
          ];
        case 5:
          return [
            3,
            8
          ];
        case 6:
          err = _state.sent();
          _didIteratorError = true;
          _iteratorError = err;
          return [
            3,
            8
          ];
        case 7:
          try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
          return [
            7
          ];
        case 8:
          if (!mockFilePath) {
            return [
              2,
              void 0
            ];
          }
          return [
            4,
            import(mockFilePath)
          ];
        case 9:
          _ref2 = _state.sent(), mockHandlers = _ref2.default, config = _ref2.config;
          enable = config === null || config === void 0 ? void 0 : config.enable;
          if (enable === false) {
            return [
              2,
              void 0
            ];
          }
          if (!mockHandlers) {
            throw new Error("Mock file ".concat(mockFilePath, " parsed failed!"));
          }
          return [
            2,
            {
              mockHandlers,
              config
            }
          ];
      }
    });
  });
  return function getMockModule2(pwd) {
    return _ref.apply(this, arguments);
  };
}();
var getMatched = function(request, mockApis) {
  var targetPathname = request.path, targetMethod = request.method;
  var matched = mockApis.find(function(mockApi) {
    var method = mockApi.method, pathname = mockApi.path;
    if (method.toLowerCase() === targetMethod.toLowerCase()) {
      return match(pathname, {
        encode: encodeURI,
        decode: decodeURIComponent
      })(targetPathname);
    }
    return false;
  });
  return matched;
};
function initOrUpdateMockMiddlewares(pwd) {
  return _initOrUpdateMockMiddlewares.apply(this, arguments);
}
function _initOrUpdateMockMiddlewares() {
  _initOrUpdateMockMiddlewares = _async_to_generator(function(pwd) {
    var mockModule;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            getMockModule(pwd)
          ];
        case 1:
          mockModule = _state.sent();
          mockConfig = mockModule === null || mockModule === void 0 ? void 0 : mockModule.config;
          mockAPIs = Object.entries((mockModule === null || mockModule === void 0 ? void 0 : mockModule.mockHandlers) || {}).map(function(param) {
            var _param = _sliced_to_array(param, 2), key = _param[0], handler = _param[1];
            var _parseKey = parseKey(key), method = _parseKey.method, path2 = _parseKey.path;
            return {
              method,
              path: path2,
              handler
            };
          });
          return [
            2
          ];
      }
    });
  });
  return _initOrUpdateMockMiddlewares.apply(this, arguments);
}
function getMockMiddleware(pwd) {
  return _getMockMiddleware.apply(this, arguments);
}
function _getMockMiddleware() {
  _getMockMiddleware = _async_to_generator(function(pwd) {
    var mockMiddleware;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          return [
            4,
            initOrUpdateMockMiddlewares(pwd)
          ];
        case 1:
          _state.sent();
          mockMiddleware = function() {
            var _ref = _async_to_generator(function(c, next) {
              var isEnabled, matchedMockAPI, handler;
              return _ts_generator(this, function(_state2) {
                switch (_state2.label) {
                  case 0:
                    if (typeof (mockConfig === null || mockConfig === void 0 ? void 0 : mockConfig.enable) === "function") {
                      isEnabled = mockConfig.enable(c.env.node.req, c.env.node.res);
                      if (!isEnabled) {
                        return [
                          2,
                          next()
                        ];
                      }
                    }
                    matchedMockAPI = getMatched(c.req, mockAPIs);
                    if (!matchedMockAPI)
                      return [
                        3,
                        3
                      ];
                    handler = matchedMockAPI.handler;
                    if (!(typeof handler === "function"))
                      return [
                        3,
                        2
                      ];
                    return [
                      4,
                      connectMid2HonoMid(handler)(c, next)
                    ];
                  case 1:
                    return [
                      2,
                      _state2.sent()
                    ];
                  case 2:
                    return [
                      2,
                      c.json(handler)
                    ];
                  case 3:
                    return [
                      2,
                      next()
                    ];
                }
              });
            });
            return function mockMiddleware2(c, next) {
              return _ref.apply(this, arguments);
            };
          }();
          return [
            2,
            mockMiddleware
          ];
      }
    });
  });
  return _getMockMiddleware.apply(this, arguments);
}
export {
  getMatched,
  getMockMiddleware,
  initOrUpdateMockMiddlewares
};
