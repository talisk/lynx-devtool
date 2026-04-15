import { TextEncoder } from "util";
import { serializeJson } from "@modern-js/runtime-utils/node";
function isTrackedPromise(value) {
  return value != null && typeof value.then === "function" && value._tracked === true;
}
const DEFERRED_VALUE_PLACEHOLDER_PREFIX = "__deferred_promise:";
function createDeferredReadableStream(deferredData, signal) {
  const encoder = new TextEncoder();
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
    controller.enqueue(encoder.encode(`error:${serializeJson({
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
export {
  createDeferredReadableStream
};
