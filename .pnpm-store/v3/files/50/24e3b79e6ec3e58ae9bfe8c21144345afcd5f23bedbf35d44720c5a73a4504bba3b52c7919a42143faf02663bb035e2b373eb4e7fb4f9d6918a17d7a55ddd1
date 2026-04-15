import { _ as _class_call_check } from "@swc/helpers/_/_class_call_check";
import crypto from "crypto";
import fs from "fs";
var StatsCache = /* @__PURE__ */ function() {
  "use strict";
  function StatsCache2() {
    _class_call_check(this, StatsCache2);
    this.cachedHash = {};
    this.cachedSize = {};
  }
  var _proto = StatsCache2.prototype;
  _proto.add = function add(files) {
    var _this = this, cachedHash = _this.cachedHash, cachedSize = _this.cachedSize;
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
    try {
      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var filename = _step.value;
        if (fs.existsSync(filename)) {
          var stats = fs.statSync(filename);
          if (stats.isFile() && !cachedHash[filename]) {
            cachedHash[filename] = this.hash(stats, filename);
            cachedSize[filename] = stats.size;
          }
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
  };
  _proto.refresh = function refresh(filename) {
    var _this = this, cachedHash = _this.cachedHash, cachedSize = _this.cachedSize;
    if (fs.existsSync(filename)) {
      var stats = fs.statSync(filename);
      if (stats.isFile()) {
        cachedHash[filename] = this.hash(stats, filename);
        cachedSize[filename] = stats.size;
      }
    }
  };
  _proto.del = function del(filename) {
    if (this.cachedHash[filename]) {
      delete this.cachedHash[filename];
      delete this.cachedSize[filename];
    }
  };
  _proto.isDiff = function isDiff(filename) {
    var _this = this, cachedHash = _this.cachedHash, cachedSize = _this.cachedSize;
    var stats = fs.statSync(filename);
    var hash = cachedHash[filename];
    var size = cachedSize[filename];
    if (stats.size !== size) {
      return true;
    }
    if (this.hash(stats, filename) !== hash) {
      return true;
    }
    return false;
  };
  _proto.has = function has(filename) {
    return Boolean(this.cachedHash[filename]);
  };
  _proto.hash = function hash(stats, filename) {
    return crypto.createHash("md5").update(fs.readFileSync(filename)).digest("hex");
  };
  return StatsCache2;
}();
export {
  StatsCache
};
