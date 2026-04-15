import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { redirect } from "@modern-js/runtime-utils/router";
import { compile } from "path-to-regexp";
import { CONTENT_TYPE_DEFERRED, DIRECT_PARAM, LOADER_ID_PARAM } from "../common/constants";
import { parseDeferredReadableStream } from "./data";
var getRequestUrl = function(param) {
  var params = param.params, request = param.request, routeId = param.routeId;
  var url = new URL(request.url);
  var toPath = compile(url.pathname, {
    encode: encodeURIComponent
  });
  var newPathName = toPath(params);
  url.pathname = newPathName;
  url.searchParams.append(LOADER_ID_PARAM, routeId);
  url.searchParams.append(DIRECT_PARAM, "true");
  return url;
};
var handleRedirectResponse = function(res) {
  var headers = res.headers;
  var location = headers.get("X-Modernjs-Redirect");
  if (location) {
    throw redirect(location);
  }
  return res;
};
var handleDeferredResponse = function() {
  var _ref = _async_to_generator(function(res) {
    var _res_headers_get;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          if (!(((_res_headers_get = res.headers.get("Content-Type")) === null || _res_headers_get === void 0 ? void 0 : _res_headers_get.match(CONTENT_TYPE_DEFERRED)) && res.body))
            return [
              3,
              2
            ];
          return [
            4,
            parseDeferredReadableStream(res.body)
          ];
        case 1:
          return [
            2,
            _state.sent()
          ];
        case 2:
          return [
            2,
            res
          ];
      }
    });
  });
  return function handleDeferredResponse2(res) {
    return _ref.apply(this, arguments);
  };
}();
var isErrorResponse = function(res) {
  return res.headers.get("X-Modernjs-Error") != null;
};
var handleErrorResponse = function() {
  var _ref = _async_to_generator(function(res) {
    var data, error;
    return _ts_generator(this, function(_state) {
      switch (_state.label) {
        case 0:
          if (!isErrorResponse(res))
            return [
              3,
              2
            ];
          return [
            4,
            res.json()
          ];
        case 1:
          data = _state.sent();
          error = new Error(data.message);
          error.stack = data.stack;
          throw error;
        case 2:
          return [
            2,
            res
          ];
      }
    });
  });
  return function handleErrorResponse2(res) {
    return _ref.apply(this, arguments);
  };
}();
var createRequest = function(routeId) {
  var method = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "get";
  return function() {
    var _ref = _async_to_generator(function(param) {
      var params, request, url, res;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            params = param.params, request = param.request;
            url = getRequestUrl({
              params,
              request,
              routeId
            });
            return [
              4,
              fetch(url, {
                method,
                signal: request.signal
              })
            ];
          case 1:
            res = _state.sent();
            res = handleRedirectResponse(res);
            return [
              4,
              handleErrorResponse(res)
            ];
          case 2:
            res = _state.sent();
            return [
              4,
              handleDeferredResponse(res)
            ];
          case 3:
            res = _state.sent();
            return [
              2,
              res
            ];
        }
      });
    });
    return function(_) {
      return _ref.apply(this, arguments);
    };
  }();
};
var createActionRequest = function(routeId) {
  return function() {
    var _ref = _async_to_generator(function(param) {
      var params, request, url, init, contentType, _, _1, res;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            params = param.params, request = param.request;
            url = getRequestUrl({
              params,
              request,
              routeId
            });
            init = {
              signal: request.signal
            };
            if (!(request.method !== "GET"))
              return [
                3,
                8
              ];
            init.method = request.method;
            contentType = request.headers.get("Content-Type");
            if (!(contentType && /\bapplication\/json\b/.test(contentType)))
              return [
                3,
                2
              ];
            init.headers = {
              "Content-Type": contentType
            };
            _ = JSON.stringify;
            return [
              4,
              request.json()
            ];
          case 1:
            init.body = _.apply(JSON, [
              _state.sent()
            ]);
            return [
              3,
              8
            ];
          case 2:
            if (!(contentType && /\btext\/plain\b/.test(contentType)))
              return [
                3,
                4
              ];
            init.headers = {
              "Content-Type": contentType
            };
            return [
              4,
              request.text()
            ];
          case 3:
            init.body = _state.sent();
            return [
              3,
              8
            ];
          case 4:
            if (!(contentType && /\bapplication\/x-www-form-urlencoded\b/.test(contentType)))
              return [
                3,
                6
              ];
            _1 = URLSearchParams.bind;
            return [
              4,
              request.text()
            ];
          case 5:
            init.body = new (_1.apply(URLSearchParams, [
              void 0,
              _state.sent()
            ]))();
            return [
              3,
              8
            ];
          case 6:
            return [
              4,
              request.formData()
            ];
          case 7:
            init.body = _state.sent();
            _state.label = 8;
          case 8:
            return [
              4,
              fetch(url, init)
            ];
          case 9:
            res = _state.sent();
            if (!res.ok) {
              throw res;
            }
            return [
              2,
              res
            ];
        }
      });
    });
    return function(_) {
      return _ref.apply(this, arguments);
    };
  }();
};
export {
  createActionRequest,
  createRequest,
  getRequestUrl
};
