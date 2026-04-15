"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var response_exports = {};
__export(response_exports, {
  createDeferredReadableStream: () => createDeferredReadableStream
});
module.exports = __toCommonJS(response_exports);
var import_util = require("util");
var import_node = require("@modern-js/runtime-utils/node");
function isTrackedPromise(value) {
  return value != null && typeof value.then === "function" && value._tracked === true;
}
const DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function createDeferredReadableStream(deferredData, signal) {
  const encoder = new import_util.TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      const criticalData = {};
      const preresolvedKeys = [];
      for (const [key, value] of Object.entries(deferredData.data)) {
        if (isTrackedPromise(value)) {
          criticalData[key] = `${DEFERRED_VALUE_PLACEHOLDER_PREFIX}${key}`;
          if (typeof value._data !== "undefined" || typeof value._error !== "undefined") {
            preresolvedKeys.push(key);
          }
        } else {
          criticalData[key] = value;
        }
      }
      controller.enqueue(encoder.encode(`${JSON.stringify(criticalData)}

`));
      for (const preresolvedKey of preresolvedKeys) {
        enqueueTrackedPromise(controller, encoder, preresolvedKey, deferredData.data[preresolvedKey]);
      }
      const unsubscribe = deferredData.subscribe((aborted, settledKey) => {
        if (settledKey) {
          enqueueTrackedPromise(controller, encoder, settledKey, deferredData.data[settledKey]);
        }
      });
      await deferredData.resolveData(signal);
      unsubscribe();
      controller.close();
    }
  });
  return stream;
}
function enqueueTrackedPromise(controller, encoder, settledKey, promise) {
  if ("_error" in promise) {
    const { _error } = promise;
    controller.enqueue(encoder.encode(`error:${(0, import_node.serializeJson)({
      [settledKey]: {
        message: _error.message,
        stack: _error.stack
      }
    })}

`));
  } else {
    var _promise__data;
    controller.enqueue(encoder.encode(`data:${JSON.stringify({
      [settledKey]: (_promise__data = promise._data) !== null && _promise__data !== void 0 ? _promise__data : null
    })}

`));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDeferredReadableStream
});
