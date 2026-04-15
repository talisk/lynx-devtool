import invariant from "invariant";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { RuntimeReactContext } from "../context/runtime";
import { LoaderStatus } from "./loaderManager";
const useLoader = (loaderFn, options = {
  params: void 0
}) => {
  const context = useContext(RuntimeReactContext);
  const isSSRRender = Boolean(context.ssr);
  const { loaderManager } = context;
  const loaderRef = useRef();
  const unlistenLoaderChangeRef = useRef(null);
  if (isSSRRender && Object.prototype.hasOwnProperty.call(options, "_cache")) {
    delete options._cache;
  }
  const load = useCallback((params) => {
    var _unlistenLoaderChangeRef_current, _window__SSR_DATA_data_loadersData_id, _window__SSR_DATA_data_loadersData, _window__SSR_DATA_data, _window__SSR_DATA, _window, _loaderRef_current;
    if (typeof params === "undefined") {
      var _loaderRef_current1;
      return (_loaderRef_current1 = loaderRef.current) === null || _loaderRef_current1 === void 0 ? void 0 : _loaderRef_current1.load();
    }
    const id = loaderManager.add(() => {
      try {
        const res2 = loaderFn(context, params);
        if (res2 instanceof Promise) {
          return res2;
        }
        return Promise.resolve(res2);
      } catch (e) {
        return Promise.reject(e);
      }
    }, {
      ...options,
      params
    });
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
    const res = loaderRef.current.load();
    unlistenLoaderChangeRef.current = (_loaderRef_current = loaderRef.current) === null || _loaderRef_current === void 0 ? void 0 : _loaderRef_current.onChange((_status, _result) => {
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
  useEffect(() => () => {
    var _unlistenLoaderChangeRef_current;
    (_unlistenLoaderChangeRef_current = unlistenLoaderChangeRef.current) === null || _unlistenLoaderChangeRef_current === void 0 ? void 0 : _unlistenLoaderChangeRef_current.call(unlistenLoaderChangeRef);
  }, []);
  useMemo(() => {
    var _options_params;
    const p = (_options_params = options.params) !== null && _options_params !== void 0 ? _options_params : loaderFn.id;
    invariant(typeof p !== "undefined" && p !== null, "Params is required in useLoader");
    load(p);
  }, [
    options.params
  ]);
  const [result, setResult] = useState(loaderRef.current.result);
  return {
    ...result,
    reload: load
  };
};
var useLoader_default = useLoader;
export {
  useLoader_default as default
};
