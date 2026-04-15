import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
var Storage = /* @__PURE__ */ function() {
  "use strict";
  function Storage2(namespace, container) {
    _class_call_check(this, Storage2);
    this.namespace = namespace;
    this.container = container;
  }
  var _proto = Storage2.prototype;
  _proto.keys = function keys() {
    var _this = this;
    return _async_to_generator(function() {
      var _this_forEach, _this1, _keys;
      return _ts_generator(this, function(_state) {
        _keys = [];
        (_this_forEach = (_this1 = _this).forEach) === null || _this_forEach === void 0 ? void 0 : _this_forEach.call(_this1, function(_, k) {
          _keys.push(k);
        });
        return [
          2,
          _keys
        ];
      });
    })();
  };
  _proto.values = function values() {
    var _this = this;
    return _async_to_generator(function() {
      var _this_forEach, _this1, _values;
      return _ts_generator(this, function(_state) {
        _values = [];
        (_this_forEach = (_this1 = _this).forEach) === null || _this_forEach === void 0 ? void 0 : _this_forEach.call(_this1, function(v) {
          _values.push(v);
        });
        return [
          2,
          _values
        ];
      });
    })();
  };
  _proto.get = function get(key) {
    var uniqueKey = this.computedUniqueKey(key);
    return this.container.get(uniqueKey);
  };
  _proto.set = function set(key, value) {
    var _this = this;
    return _async_to_generator(function() {
      var uniqueKey;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            uniqueKey = _this.computedUniqueKey(key);
            return [
              4,
              _this.container.set(uniqueKey, value)
            ];
          case 1:
            _state.sent();
            return [
              2,
              _this
            ];
        }
      });
    })();
  };
  _proto.has = function has(key) {
    var uniqueKey = this.computedUniqueKey(key);
    return this.container.has(uniqueKey);
  };
  _proto.delete = function _delete(key) {
    var uniqueKey = this.computedUniqueKey(key);
    return this.container.delete(uniqueKey);
  };
  _proto.clear = function clear() {
    var _this = this;
    return _async_to_generator(function() {
      var _this_keys, _this1, keys;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            return [
              4,
              (_this_keys = (_this1 = _this).keys) === null || _this_keys === void 0 ? void 0 : _this_keys.call(_this1)
            ];
          case 1:
            keys = _state.sent();
            return [
              4,
              Promise.all((keys === null || keys === void 0 ? void 0 : keys.map(function() {
                var _ref = _async_to_generator(function(key) {
                  return _ts_generator(this, function(_state2) {
                    return [
                      2,
                      _this.container.delete(key)
                    ];
                  });
                });
                return function(key) {
                  return _ref.apply(this, arguments);
                };
              }())) || [])
            ];
          case 2:
            _state.sent();
            return [
              2
            ];
        }
      });
    })();
  };
  _proto.forEach = function forEach(fallbackFn) {
    var _this = this;
    var _this_container_forEach, _this_container;
    (_this_container_forEach = (_this_container = this.container).forEach) === null || _this_container_forEach === void 0 ? void 0 : _this_container_forEach.call(_this_container, function(v, k) {
      if (_this.checkIsOwnkey(k)) {
        fallbackFn(v, k, _this);
      }
    });
  };
  _proto.computedUniqueKey = function computedUniqueKey(k) {
    return "".concat(this.namespace, ":").concat(k);
  };
  _proto.checkIsOwnkey = function checkIsOwnkey(k) {
    return k.startsWith(this.namespace);
  };
  return Storage2;
}();
export {
  Storage
};
