import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _instanceof } from "@swc/helpers/_/_instanceof";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import { isRouteErrorResponse, json } from "@modern-js/runtime-utils/remix-router";
function sanitizeError(error) {
  if (_instanceof(error, Error) && process.env.NODE_ENV !== "development" && process.env.NODE_ENV !== "test") {
    var sanitized = new Error("Unexpected Server Error");
    sanitized.stack = void 0;
    return sanitized;
  }
  return error;
}
function sanitizeErrors(errors) {
  return Object.entries(errors).reduce(function(acc, param) {
    var _param = _sliced_to_array(param, 2), routeId = _param[0], error = _param[1];
    return Object.assign(acc, _define_property({}, routeId, sanitizeError(error)));
  }, {});
}
function serializeError(error) {
  var sanitized = sanitizeError(error);
  return {
    message: sanitized.message,
    stack: sanitized.stack
  };
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
        var sanitized = sanitizeError(val);
        serialized[key] = _object_spread({
          message: sanitized.message,
          stack: sanitized.stack,
          __type: "Error"
        }, sanitized.name !== "Error" ? {
          __subType: sanitized.name
        } : {});
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
function errorResponseToJson(errorResponse) {
  return json(
    // @ts-expect-error This is "private" from users but intended for internal use
    serializeError(errorResponse.error || new Error("Unexpected Server Error")),
    {
      status: errorResponse.status,
      statusText: errorResponse.statusText,
      headers: {
        "X-Modernjs-Error": "yes"
      }
    }
  );
}
export {
  errorResponseToJson,
  sanitizeError,
  sanitizeErrors,
  serializeError,
  serializeErrors
};
