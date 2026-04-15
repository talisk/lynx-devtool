import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import LRU from "lru-cache";
var MemoryContainer = /* @__PURE__ */ function() {
  "use strict";
  function MemoryContainer2() {
    var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, max = _ref.max, maxAge = _ref.maxAge;
    _class_call_check(this, MemoryContainer2);
    this.cache = new LRU({
      max: (max || 256) * MemoryContainer2.MB,
      maxAge: maxAge || MemoryContainer2.hour
    });
  }
  var _proto = MemoryContainer2.prototype;
  _proto.get = function get(key) {
    var _this = this;
    return _async_to_generator(function() {
      return _ts_generator(this, function(_state) {
        return [
          2,
          _this.cache.get(key)
        ];
      });
    })();
  };
  _proto.set = function set(key, value) {
    var _this = this;
    return _async_to_generator(function() {
      return _ts_generator(this, function(_state) {
        _this.cache.set(key, value);
        return [
          2,
          _this
        ];
      });
    })();
  };
  _proto.has = function has(key) {
    var _this = this;
    return _async_to_generator(function() {
      return _ts_generator(this, function(_state) {
        return [
          2,
          _this.cache.has(key)
        ];
      });
    })();
  };
  _proto.delete = function _delete(key) {
    var _this = this;
    return _async_to_generator(function() {
      var exist;
      return _ts_generator(this, function(_state) {
        switch (_state.label) {
          case 0:
            return [
              4,
              _this.has(key)
            ];
          case 1:
            exist = _state.sent();
            if (exist) {
              _this.cache.del(key);
            }
            return [
              2,
              exist
            ];
        }
      });
    })();
  };
  _proto.forEach = function forEach(callbackFn) {
    var _this = this;
    this.cache.forEach(function(value, key) {
      callbackFn(value, key, _this);
    });
  };
  return MemoryContainer2;
}();
MemoryContainer.BYTE = 1;
MemoryContainer.KB = 1024 * MemoryContainer.BYTE;
MemoryContainer.MB = 1024 * MemoryContainer.KB;
MemoryContainer.ms = 1;
MemoryContainer.second = MemoryContainer.ms * 1e3;
MemoryContainer.minute = MemoryContainer.second * 60;
MemoryContainer.hour = MemoryContainer.minute * 60;
export {
  MemoryContainer
};
