import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _to_consumable_array } from "@swc/helpers/_/_to_consumable_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import invariant from "invariant";
var createGetId = function() {
  var idCache = /* @__PURE__ */ new Map();
  return function(objectId) {
    var cachedId = idCache.get(objectId);
    if (cachedId) {
      return cachedId;
    }
    var id = JSON.stringify(objectId);
    invariant(id, "params should be not null value");
    idCache.set(objectId, id);
    return id;
  };
};
var LoaderStatus;
(function(LoaderStatus2) {
  LoaderStatus2[LoaderStatus2["idle"] = 0] = "idle";
  LoaderStatus2[LoaderStatus2["loading"] = 1] = "loading";
  LoaderStatus2[LoaderStatus2["fulfilled"] = 2] = "fulfilled";
  LoaderStatus2[LoaderStatus2["rejected"] = 3] = "rejected";
})(LoaderStatus || (LoaderStatus = {}));
var createLoader = function(id) {
  var initialData = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {
    loading: false,
    reloading: false,
    data: void 0,
    error: void 0
  }, loaderFn = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : function() {
    return Promise.resolve();
  }, skip = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : false;
  var promise;
  var status = 0;
  var data = initialData.data, error = initialData.error;
  var hasLoaded = false;
  var handlers = /* @__PURE__ */ new Set();
  var load = function() {
    var _ref = _async_to_generator(function() {
      return _ts_generator(this, function(_state) {
        if (skip) {
          return [
            2,
            promise
          ];
        }
        if (status === 1) {
          return [
            2,
            promise
          ];
        }
        status = 1;
        notify();
        promise = loaderFn().then(function(value) {
          data = value;
          error = null;
          status = 2;
        }).catch(function(e) {
          error = e;
          data = null;
          status = 3;
        }).finally(function() {
          promise = null;
          hasLoaded = true;
          notify();
        });
        return [
          2,
          promise
        ];
      });
    });
    return function load2() {
      return _ref.apply(this, arguments);
    };
  }();
  var getResult = function() {
    return {
      loading: !hasLoaded && status === 1,
      reloading: hasLoaded && status === 1,
      data,
      error: _instanceof(error, Error) ? "".concat(error.message) : error,
      // redundant fields for ssr log
      _error: error
    };
  };
  var notify = function() {
    _to_consumable_array(handlers).forEach(function(handler) {
      handler(status, getResult());
    });
  };
  var onChange = function(handler) {
    handlers.add(handler);
    return function() {
      handlers.delete(handler);
    };
  };
  return {
    get result() {
      return getResult();
    },
    get promise() {
      return promise;
    },
    onChange,
    load
  };
};
var createLoaderManager = function(initialDataMap) {
  var managerOptions = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var _managerOptions_skipStatic = managerOptions.skipStatic, skipStatic = _managerOptions_skipStatic === void 0 ? false : _managerOptions_skipStatic, _managerOptions_skipNonStatic = managerOptions.skipNonStatic, skipNonStatic = _managerOptions_skipNonStatic === void 0 ? false : _managerOptions_skipNonStatic;
  var loadersMap = /* @__PURE__ */ new Map();
  var getId = createGetId();
  var add = function(loaderFn, loaderOptions) {
    var id = getId(loaderOptions.params);
    var loader = loadersMap.get(id);
    var cache = loaderOptions._cache;
    if (!loader || cache === false) {
      var ignoreNonStatic = skipNonStatic && !loaderOptions.static;
      var ignoreStatic = skipStatic && loaderOptions.static;
      var skipExec = ignoreNonStatic || ignoreStatic;
      loader = createLoader(
        id,
        typeof initialDataMap[id] !== "undefined" ? initialDataMap[id] : {
          data: loaderOptions.initialData
        },
        loaderFn,
        // Todo whether static loader is exec when CSR
        skipExec
      );
      loadersMap.set(id, loader);
    }
    return id;
  };
  var get = function(id) {
    return loadersMap.get(id);
  };
  var hasPendingLoaders = function() {
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = loadersMap.values()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var loader = _step.value;
        var promise = loader.promise;
        if (_instanceof(promise, Promise)) {
          return true;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
    return false;
  };
  var awaitPendingLoaders = function() {
    var _ref = _async_to_generator(function() {
      var pendingLoaders, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, id, loader, promise;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            pendingLoaders = [];
            _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
            try {
              for (_iterator = loadersMap[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                _step_value = _sliced_to_array(_step.value, 2), id = _step_value[0], loader = _step_value[1];
                promise = loader.promise;
                if (_instanceof(promise, Promise)) {
                  pendingLoaders.push([
                    id,
                    loader
                  ]);
                }
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
            return [
              4,
              Promise.all(pendingLoaders.map(function(item) {
                return item[1].promise;
              }))
            ];
          case 1:
            _state.sent();
            return [
              2,
              pendingLoaders.reduce(function(res, param) {
                var _param = _sliced_to_array(param, 2), id2 = _param[0], loader2 = _param[1];
                res[id2] = loader2.result;
                return res;
              }, {})
            ];
        }
      });
    });
    return function awaitPendingLoaders2() {
      return _ref.apply(this, arguments);
    };
  }();
  return {
    hasPendingLoaders,
    awaitPendingLoaders,
    add,
    get
  };
};
export {
  LoaderStatus,
  createLoaderManager
};
