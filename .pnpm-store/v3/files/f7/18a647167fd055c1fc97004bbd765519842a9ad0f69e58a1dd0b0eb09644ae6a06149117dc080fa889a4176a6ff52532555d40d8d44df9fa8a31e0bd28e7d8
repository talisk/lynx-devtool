import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { isRouteErrorResponse } from "@modern-js/runtime-utils/remix-router";
function attributesToString(attributes) {
  return Object.entries(attributes).reduce(function(str, param) {
    var _param = _sliced_to_array(param, 2), key = _param[0], value = _param[1];
    return value === void 0 ? str : "".concat(str, " ").concat(key, '="').concat(value, '"');
  }, "");
}
function safeReplace(source, searchValue, replaceValue) {
  return source.replace(searchValue, function() {
    return replaceValue;
  });
}
function checkIsNode() {
  var _process_release;
  return typeof process !== "undefined" && ((_process_release = process.release) === null || _process_release === void 0 ? void 0 : _process_release.name) === "node";
}
function serializeErrors(errors) {
  if (!errors) {
    return null;
  }
  var entries = Object.entries(errors);
  var serialized = {};
  var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
  try {
    for (var _iterator = entries[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], val = _step_value[1];
      if (isRouteErrorResponse(val)) {
        serialized[key] = _object_spread_props(_object_spread({}, val), {
          __type: "RouteErrorResponse"
        });
      } else if (_instanceof(val, Error)) {
        serialized[key] = {
          message: val.message,
          stack: val.stack,
          __type: "Error"
        };
      } else {
        serialized[key] = val;
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
  return serialized;
}
function getSSRConfigByEntry(entryName, ssr, ssrByEntries) {
  if (ssrByEntries === null || ssrByEntries === void 0 ? void 0 : ssrByEntries[entryName]) {
    return ssrByEntries[entryName];
  }
  return ssr || true;
}
function getSSRMode(ssrConfig) {
  if (typeof ssrConfig === "boolean") {
    return ssrConfig ? "string" : false;
  }
  return (ssrConfig === null || ssrConfig === void 0 ? void 0 : ssrConfig.mode) === "stream" ? "stream" : "string";
}
export {
  attributesToString,
  checkIsNode,
  getSSRConfigByEntry,
  getSSRMode,
  safeReplace,
  serializeErrors
};
