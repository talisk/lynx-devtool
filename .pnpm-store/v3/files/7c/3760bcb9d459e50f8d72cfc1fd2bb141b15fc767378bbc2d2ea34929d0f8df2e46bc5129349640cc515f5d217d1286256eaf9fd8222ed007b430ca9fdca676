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
var useLoader_exports = {};
__export(useLoader_exports, {
  default: () => useLoader_default
});
module.exports = __toCommonJS(useLoader_exports);
var import_invariant = __toESM(require("invariant"));
var import_react = require("react");
var import_runtime = require("../context/runtime");
var import_loaderManager = require("./loaderManager");
const useLoader = (loaderFn, options = {
  params: void 0
}) => {
  const context = (0, import_react.useContext)(import_runtime.RuntimeReactContext);
  const isSSRRender = Boolean(context.ssr);
  const { loaderManager } = context;
  const loaderRef = (0, import_react.useRef)();
  const unlistenLoaderChangeRef = (0, import_react.useRef)(null);
  if (isSSRRender && Object.prototype.hasOwnProperty.call(options, "_cache")) {
    delete options._cache;
  }
  const load = (0, import_react.useCallback)((params) => {
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
      if (_status === import_loaderManager.LoaderStatus.fulfilled) {
        var _options_onSuccess;
        options === null || options === void 0 ? void 0 : (_options_onSuccess = options.onSuccess) === null || _options_onSuccess === void 0 ? void 0 : _options_onSuccess.call(options, _result.data);
      }
      if (_status === import_loaderManager.LoaderStatus.rejected) {
        var _options_onError;
        options === null || options === void 0 ? void 0 : (_options_onError = options.onError) === null || _options_onError === void 0 ? void 0 : _options_onError.call(options, _result.error);
      }
    });
    return res;
  }, [
    options.skip
  ]);
  (0, import_react.useEffect)(() => () => {
    var _unlistenLoaderChangeRef_current;
    (_unlistenLoaderChangeRef_current = unlistenLoaderChangeRef.current) === null || _unlistenLoaderChangeRef_current === void 0 ? void 0 : _unlistenLoaderChangeRef_current.call(unlistenLoaderChangeRef);
  }, []);
  (0, import_react.useMemo)(() => {
    var _options_params;
    const p = (_options_params = options.params) !== null && _options_params !== void 0 ? _options_params : loaderFn.id;
    (0, import_invariant.default)(typeof p !== "undefined" && p !== null, "Params is required in useLoader");
    load(p);
  }, [
    options.params
  ]);
  const [result, setResult] = (0, import_react.useState)(loaderRef.current.result);
  return {
    ...result,
    reload: load
  };
};
var useLoader_default = useLoader;
