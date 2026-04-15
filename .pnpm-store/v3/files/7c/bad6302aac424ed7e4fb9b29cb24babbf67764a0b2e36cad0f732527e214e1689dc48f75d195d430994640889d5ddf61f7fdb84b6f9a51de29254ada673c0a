import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import invariant from "invariant";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { RuntimeReactContext } from "../context/runtime";
import { LoaderStatus } from "./loaderManager";
var useLoader = function(loaderFn) {
  var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    params: void 0
  };
  var context = useContext(RuntimeReactContext);
  var isSSRRender = Boolean(context.ssr);
  var loaderManager = context.loaderManager;
  var loaderRef = useRef();
  var unlistenLoaderChangeRef = useRef(null);
  if (isSSRRender && Object.prototype.hasOwnProperty.call(options, "_cache")) {
    delete options._cache;
  }
  var load = useCallback(function(params) {
    var _unlistenLoaderChangeRef_current, _window__SSR_DATA_data_loadersData_id, _window__SSR_DATA_data_loadersData, _window__SSR_DATA_data, _window__SSR_DATA, _window, _loaderRef_current;
    if (typeof params === "undefined") {
      var _loaderRef_current1;
      return (_loaderRef_current1 = loaderRef.current) === null || _loaderRef_current1 === void 0 ? void 0 : _loaderRef_current1.load();
    }
    var id = loaderManager.add(function() {
      try {
        var res2 = loaderFn(context, params);
        if (_instanceof(res2, Promise)) {
          return res2;
        }
        return Promise.resolve(res2);
      } catch (e) {
        return Promise.reject(e);
      }
    }, _object_spread_props(_object_spread({}, options), {
      params
    }));
    loaderRef.current = loaderManager.get(id);
    (_unlistenLoaderChangeRef_current = unlistenLoaderChangeRef.current) === null || _unlistenLoaderChangeRef_current === void 0 ? void 0 : _unlistenLoaderChangeRef_current.call(unlistenLoaderChangeRef);
    if (isSSRRender) {
      return void 0;
    }
    if (options.skip) {
      return void 0;
    }
    if (context._hydration && ((_window = window) === null || _window === void 0 ? void 0 : (_window__SSR_DATA = _window._SSR_DATA) === null || _window__SSR_DATA === void 0 ? void 0 : (_window__SSR_DATA_data = _window__SSR_DATA.data) === null || _window__SSR_DATA_data === void 0 ? void 0 : (_window__SSR_DATA_data_loadersData = _window__SSR_DATA_data.loadersData) === null || _window__SSR_DATA_data_loadersData === void 0 ? void 0 : (_window__SSR_DATA_data_loadersData_id = _window__SSR_DATA_data_loadersData[id]) === null || _window__SSR_DATA_data_loadersData_id === void 0 ? void 0 : _window__SSR_DATA_data_loadersData_id.error) === null) {
      return void 0;
    }
    var res = loaderRef.current.load();
    unlistenLoaderChangeRef.current = (_loaderRef_current = loaderRef.current) === null || _loaderRef_current === void 0 ? void 0 : _loaderRef_current.onChange(function(_status, _result) {
      setResult(_result);
      if (_status === LoaderStatus.fulfilled) {
        var _options_onSuccess;
        options === null || options === void 0 ? void 0 : (_options_onSuccess = options.onSuccess) === null || _options_onSuccess === void 0 ? void 0 : _options_onSuccess.call(options, _result.data);
      }
      if (_status === LoaderStatus.rejected) {
        var _options_onError;
        options === null || options === void 0 ? void 0 : (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, _result.error);
      }
    });
    return res;
  }, [
    options.skip
  ]);
  useEffect(function() {
    return function() {
      var _unlistenLoaderChangeRef_current;
      (_unlistenLoaderChangeRef_current = unlistenLoaderChangeRef.current) === null || _unlistenLoaderChangeRef_current === void 0 ? void 0 : _unlistenLoaderChangeRef_current.call(unlistenLoaderChangeRef);
    };
  }, []);
  useMemo(function() {
    var _options_params;
    var p = (_options_params = options.params) !== null && _options_params !== void 0 ? _options_params : loaderFn.id;
    invariant(typeof p !== "undefined" && p !== null, "Params is required in useLoader");
    load(p);
  }, [
    options.params
  ]);
  var _useState = _sliced_to_array(useState(loaderRef.current.result), 2), result = _useState[0], setResult = _useState[1];
  return _object_spread_props(_object_spread({}, result), {
    reload: load
  });
};
var useLoader_default = useLoader;
export {
  useLoader_default as default
};
