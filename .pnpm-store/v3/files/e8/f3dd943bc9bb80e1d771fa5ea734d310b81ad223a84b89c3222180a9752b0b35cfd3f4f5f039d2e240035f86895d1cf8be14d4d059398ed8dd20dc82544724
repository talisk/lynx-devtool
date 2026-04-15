import { _ as _async_to_generator } from "@swc/helpers/_/_async_to_generator";
import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { _ as _ts_generator } from "@swc/helpers/_/_ts_generator";
import { TextEncoder } from "util";
import { serializeJson } from "@modern-js/runtime-utils/node";
function isTrackedPromise(value) {
  return value != null && typeof value.then === "function" && value._tracked === true;
}
var DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function createDeferredReadableStream(deferredData, signal) {
  var encoder = new TextEncoder();
  var stream = new ReadableStream({
    start: function start(controller) {
      return _async_to_generator(function() {
        var criticalData, preresolvedKeys, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step_value, key, value, _iteratorNormalCompletion1, _didIteratorError1, _iteratorError1, _iterator1, _step1, preresolvedKey, unsubscribe;
        return _ts_generator(this, function(_state) {
          switch (_state.label) {
            case 0:
              criticalData = {};
              preresolvedKeys = [];
              _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = void 0;
              try {
                for (_iterator = Object.entries(deferredData.data)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  _step_value = _sliced_to_array(_step.value, 2), key = _step_value[0], value = _step_value[1];
                  if (isTrackedPromise(value)) {
                    criticalData[key] = "".concat(DEFERRED_VALUE_PLACEHOLDER_PREFIX).concat(key);
                    if (typeof value._data !== "undefined" || typeof value._error !== "undefined") {
                      preresolvedKeys.push(key);
                    }
                  } else {
                    criticalData[key] = value;
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
              controller.enqueue(encoder.encode("".concat(JSON.stringify(criticalData), "\n\n")));
              _iteratorNormalCompletion1 = true, _didIteratorError1 = false, _iteratorError1 = void 0;
              try {
                for (_iterator1 = preresolvedKeys[Symbol.iterator](); !(_iteratorNormalCompletion1 = (_step1 = _iterator1.next()).done); _iteratorNormalCompletion1 = true) {
                  preresolvedKey = _step1.value;
                  enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey]);
                }
              } catch (err) {
                _didIteratorError1 = true;
                _iteratorError1 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion1 && _iterator1.return != null) {
                    _iterator1.return();
                  }
                } finally {
                  if (_didIteratorError1) {
                    throw _iteratorError1;
                  }
                }
              }
              unsubscribe = deferredData.subscribe(function(aborted, settledKey) {
                if (settledKey) {
                  enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey]);
                }
              });
              return [
                4,
                deferredData.resolveData(signal)
              ];
            case 1:
              _state.sent();
              unsubscribe();
              controller.close();
              return [
                2
              ];
          }
        });
      })();
    }
  });
  return stream;
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise) {
  if ("_error" in promise) {
    var _error = promise._error;
    controller.enqueue(encoder.encode("error:".concat(serializeJson(_define_property({}, settledKey, {
      message: _error.message,
      stack: _error.stack
    })), "\n\n")));
  } else {
    var _promise__data;
    controller.enqueue(encoder.encode("data:".concat(JSON.stringify(_define_property({}, settledKey, (_promise__data = promise._data) !== null && _promise__data !== void 0 ? _promise__data : null)), "\n\n")));
  }
}
export {
  createDeferredReadableStream
};
